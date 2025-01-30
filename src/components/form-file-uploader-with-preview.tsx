import Image from "next/image"
import { FileUploader } from "./file-uploader";
import { cn } from "@/lib/utils";

interface FormFileUploaderWithPreviewProps {
  imageUrl?: string // preview image
  imageAlt: string // preview image
  fieldValue?: File[] // react-hook-form field.value
  onChangeSelectedFile: (...event: any[]) => void; // react-hook-form field.value
  progresses: Record<string, number> // @/hooks/use-upload-file/
  disabled: boolean // @/hooks/use-upload-file/
}

export const FormFileUploaderWithPreview = ({
  imageUrl,
  imageAlt,
  fieldValue,
  onChangeSelectedFile,
  progresses,
  disabled,
}: FormFileUploaderWithPreviewProps) => (
  <div className="flex gap-4">
    <div className={
      cn(
        !imageUrl && "hidden",
        "relative size-40 sm:size-64 bg-muted/40 rounded-lg"
      )
    }>
      {imageUrl &&
        <img
          src={imageUrl}
          alt={imageAlt}
          sizes="(min-width: 640px) 640px, 100vw"
          className="rounded-md object-cover"
        />
      }
    </div>
    <FileUploader
      className="size-40 sm:size-64"
      value={fieldValue}
      onValueChange={onChangeSelectedFile}
      progresses={progresses}
      disabled={disabled}
    />
  </div>
)
