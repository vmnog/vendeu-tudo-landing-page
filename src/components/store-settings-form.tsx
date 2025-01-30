"use client"

import { toast } from "sonner"
import {
  FormProvider,
  useForm,
  useWatch
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { z } from "@/utils/i18n-zod"
import { useUploadFile } from "@/hooks/use-upload-file"
import { useState } from "react"
import { getErrorMessage } from "@/lib/handle-error"
import { FormFileUploaderWithPreview } from "./form-file-uploader-with-preview"
import { isValidPhoneNumber } from "react-phone-number-input"
import { PhoneInput } from "./phone-input"
import { slugify } from "@/utils/slugify"

const storeSettingsSchema = z.object({
  storeName: z.string().min(3),
  storeDescription: z.string().max(200),
  storeUrl: z.string(),
  storeLogoImageUrl: z.string().url().optional(),
  storeBannerImageUrl: z.string().url().optional(),
  storeLogo: z.array(z.instanceof(File)).optional(),
  storeBanner: z.array(z.instanceof(File)).optional(),
  contactEmail: z.string().email(),
  contactPhone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Telefone inválido" }),
  storeAddress: z.string(),
  storeHours: z.string()
})

type StoreSettingsValues = z.infer<typeof storeSettingsSchema>

export function StoreSettingsForm() {
  // Load from database default values
  const defaultValues: Partial<StoreSettingsValues> = {
    storeName: "Sua Loja",
    storeDescription: "Minha loja incrível.",
    storeUrl: "Sua Loja",
    contactEmail: "cliente@vendeutudo.com.br",
    contactPhone: "",
    storeLogo: [],
    storeBanner: [],
  }

  const [loading, setLoading] = useState(false)
  const [store, setStore] = useState<Partial<StoreSettingsValues>>(
    defaultValues
  )
  const { uploadSingleFile, progresses, isUploading } = useUploadFile(
    "imageUploader",
    { defaultUploadedFiles: [] }
  )
  const form = useForm<StoreSettingsValues>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues,
    mode: "onChange",
  })

  const watchedStoreName = useWatch({
    control: form.control,
    name: 'storeName',
  });

  async function updateStoreData() {
    // Mocking database delay saving data
    return new Promise(response => {
      setTimeout(() => {
        response(toast.success("Informações atualizadas"))
      }, 2000);
    })
  }

  async function uploadFile(file: File, field: 'storeBannerImageUrl' | 'storeLogoImageUrl') {
    const response = await uploadSingleFile(file);
    setStore((prevState) => ({
      ...prevState,
      [field]: response.url,
    }));
  }

  async function onSubmit(input: StoreSettingsValues) {
    setLoading(true);

    const bannerFile = input.storeBanner?.[0];
    const logoFile = input.storeLogo?.[0];

    const uploadTasks = [];

    if (bannerFile) {
      uploadTasks.push(uploadFile(bannerFile, 'storeBannerImageUrl'));
    }

    if (logoFile) {
      uploadTasks.push(uploadFile(logoFile, 'storeLogoImageUrl'));
    }

    if (uploadTasks.length > 0) {
      toast.promise(Promise.all(uploadTasks), {
        loading: "Enviando imagens...",
        success: "Imagens enviadas com sucesso!",
        error: (err) => getErrorMessage(err),
      });
    }

    try {
      await Promise.all(uploadTasks);
      form.resetField("storeBanner");
      form.resetField("storeLogo");
      await updateStoreData();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Loja</FormLabel>
              <FormControl>
                <Input placeholder="Nome da Loja" {...field} />
              </FormControl>
              <FormDescription>
                Este é o nome que seus clientes irão ver ao entrar no site da sua loja.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição da Loja</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição da loja"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Forneça uma breve descrição para atrair seus clientes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Loja</FormLabel>
              <FormControl>
                <Input disabled placeholder="https://minhaloja.com" {...field} />
              </FormControl>
              <FormDescription>
                https://<span className="text-foreground font-bold">{slugify(field.value)}</span>.vendeutudo.com.br</FormDescription>
              <FormDescription>
                O link que os clientes usarão para acessar sua loja online.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeLogo"
          render={({ field: file }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Logotipo da Loja</FormLabel>
                <FormControl>
                  <FormFileUploaderWithPreview
                    imageUrl={store.storeLogoImageUrl}
                    imageAlt={`Logo da Loja ${watchedStoreName}`}
                    fieldValue={file.value}
                    onChangeSelectedFile={file.onChange}
                    progresses={progresses}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormDescription>
                  Faça o upload do logotipo que representa a sua loja.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="storeBanner"
          render={({ field: file }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Banner da Loja</FormLabel>
                <FormControl>
                  <FormFileUploaderWithPreview
                    imageUrl={store.storeBannerImageUrl}
                    imageAlt={`Logo da Loja ${watchedStoreName}`}
                    fieldValue={file.value}
                    onChangeSelectedFile={file.onChange}
                    progresses={progresses}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormDescription>
                  Carregue um banner para destacar na página principal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email de Contato</FormLabel>
              <FormControl>
                <Input placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormDescription>
                O email pelo qual os clientes podem entrar em contato com você.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Telefone de Contato</FormLabel>
              <FormControl className="w-full">
                <PhoneInput placeholder="(11) 1234-5678" {...field} />
              </FormControl>
              <FormDescription className="text-left">
                Número de telefone para contato com os clientes.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço da Loja</FormLabel>
              <FormControl>
                <Textarea placeholder="Rua Exemplo, 123" {...field} />
              </FormControl>
              <FormDescription>
                O endereço físico onde sua loja está localizada.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="storeHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário de Funcionamento</FormLabel>
              <FormControl>
                <Textarea placeholder="Seg-Sex: 9h-18h" {...field} />
              </FormControl>
              <FormDescription>
                Informe os horários em que sua loja está aberta para atendimento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Atualizar Configurações
        </Button>
      </form>
    </FormProvider>
  )
}
