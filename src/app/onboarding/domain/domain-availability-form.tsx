'use client';

import { useRef, useTransition, useState, Suspense, PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schema';
import { checkDomainAvailability } from './actions';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, XIcon } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { slugify } from '@/utils/slugify';
import { TypeOf, z } from 'zod';
import { PendingSubmitButton } from './domain-availability-pending-button';
import { cn } from '@/lib/utils';

const INITIAL_DOMAIN_STATUS = { available: false, price: 0 }
const INITIAL_STORE_NAME = 'Sua Loja'

export function DomainAvailabilityForm({ children: NextStepButton }: PropsWithChildren) {
  const [isPending, startTransition] = useTransition();
  const [domainStatus, setDomainStatus] = useState(INITIAL_DOMAIN_STATUS);
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      domain: slugify(INITIAL_STORE_NAME)
    },
  });

  type FormData = TypeOf<typeof schema>;

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      const slugifiedDomain = slugify(data.domain);
      form.setValue("domain", slugifiedDomain, { shouldValidate: true });
      const formData = new FormData(formRef.current!);
      formData.set("domain", slugifiedDomain);
      const { available, price } = await checkDomainAvailability(formData);
      setDomainStatus({ available, price });
    });
  };

  const handleDomainChange = async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    field.onChange(e);
    setDomainStatus(INITIAL_DOMAIN_STATUS);
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(onSubmit)(evt);
        }}
      >
        <CardContent className="grid gap-2">
          <div className="flex items-center">
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Domínio (Link de URL do seu site)</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder={slugify(INITIAL_STORE_NAME)}
                      {...field}
                      onChange={(e) => handleDomainChange(e, field)}
                    />
                  </FormControl>
                  <div className='flex items-center justify-between gap-2'>
                    <span className="mr-1 text-muted-foreground">www.</span>
                    <span className="ml-1 text-muted-foreground">.com</span>
                  </div>
                  <FormMessage />
                  {!isPending && (
                    <div className='flex items-center gap-2'>
                      {domainStatus.available ? (
                        <>
                          <Check className="text-green-600 size-4" />
                          <span className="text-sm text-muted-foreground">
                            Disponível por ${domainStatus.price} (USD / Dólares)
                          </span>
                        </>
                      ) : (
                        <>
                          <XIcon className="text-destructive size-4" />
                          <span className="text-sm text-muted-foreground">
                            Não disponível, verifique novamente
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex items-center gap-4">
          <PendingSubmitButton isPending={isPending}>Verificar</PendingSubmitButton>
          <div className={cn(!domainStatus.available && 'invisible')}>
            {NextStepButton}
          </div>
        </CardFooter>
      </form>
    </Form>
  );
}

