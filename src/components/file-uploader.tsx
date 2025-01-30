"use client"

import * as React from "react"
import Image from "next/image"
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons"
import Dropzone, { type DropzoneProps, type FileRejection } from "react-dropzone"
import { toast } from "sonner"
import { cn, formatBytes } from "@/lib/utils"
import { useControllableState } from "@/hooks/use-controllable-state"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: File[]
  onValueChange?: React.Dispatch<React.SetStateAction<File[]>>
  onUpload?: (files: File[]) => Promise<void>
  progresses?: Record<string, number>
  accept?: DropzoneProps["accept"]
  maxSize?: DropzoneProps["maxSize"]
  maxFiles?: DropzoneProps["maxFiles"]
  multiple?: boolean
  disabled?: boolean
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  })

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast.error("Não pode enviar mais de 1 arquivo por vez")
        return
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast.error(`Não pode enviar mais de ${maxFiles} arquivos`)
        return
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )

      const updatedFiles = files ? [...files, ...newFiles] : newFiles

      setFiles(updatedFiles)

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`Arquivo ${file.name} foi rejeitado`)
        })
      }

      if (onUpload && updatedFiles.length > 0 && updatedFiles.length <= maxFiles) {
        const target = updatedFiles.length > 0 ? `${updatedFiles.length} arquivos` : `arquivo`

        toast.promise(onUpload(updatedFiles), {
          loading: `Enviando ${target}...`,
          success: () => {
            setFiles([])
            return `${target} enviado`
          },
          error: `Falha ao enviar ${target}`,
        })
      }
    },
    [files, maxFiles, multiple, onUpload, setFiles]
  )

  function onRemove(index: number) {
    if (!files) return
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    onValueChange?.(newFiles)
  }

  React.useEffect(() => {
    return () => {
      if (!files) return
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [files])

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      {files?.length ? (
        <ScrollArea className="h-fit w-full px-3">
          <div className="max-h-48 space-y-4">
            {files?.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
                progress={progresses?.[file.name]}
              />
            ))}
          </div>
        </ScrollArea>
      ) : (

        <Dropzone
          onDrop={onDrop}
          accept={accept}
          maxSize={maxSize}
          maxFiles={maxFiles}
          multiple={maxFiles > 1 || multiple}
          disabled={isDisabled}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps()}
              className={cn(
                "group relative grid h-52 w-full max-size-40 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isDragActive && "border-muted-foreground/50",
                isDisabled && "pointer-events-none opacity-60",
                className
              )}
              {...dropzoneProps}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                  <div className="p-3">
                    <UploadIcon className="size-7 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <p className="font-medium text-muted-foreground">Solte os arquivos aqui</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                  <div className="p-3">
                    <UploadIcon className="size-7 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="space-y-px">
                    <p className="hidden sm:block font-medium text-muted-foreground">
                      Subir arquivo
                    </p>
                    <p className="hidden sm:block text-sm text-muted-foreground/70">
                      Você pode enviar {maxFiles > 1 ? `${maxFiles === Infinity ? "vários" : maxFiles} arquivos (até ${formatBytes(maxSize)} cada)` : `um arquivo de até ${formatBytes(maxSize)}`}
                    </p>
                    <p className="block sm:hidden text-sm text-muted-foreground/70">
                      {formatBytes(maxSize)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      )}
    </div>
  )
}

interface FileCardProps {
  file: File
  onRemove: () => void
  progress?: number
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <div className="relative flex items-center space-x-4">
      <div className="flex flex-1 space-x-4">
        {isFileWithPreview(file) ? (
          <img
            src={file.preview}
            alt={file.name}
            width={48}
            height={48}
            loading="lazy"
            className="aspect-square size-12 shrink-0 rounded-md object-cover"
          />
        ) : null}
        <div className="flex w-full flex-col gap-2">
          <div className="space-y-px w-32">
            <p className="truncate text-ellipsis text-sm font-medium text-foreground/80">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="icon" className="size-7" onClick={onRemove}>
          <Cross2Icon className="size-4 " aria-hidden="true" />
          <span className="sr-only">Remover arquivo</span>
        </Button>
      </div>
    </div>
  )
}

function isFileWithPreview(file: File): file is File & { preview: string } {
  return "preview" in file && typeof file.preview === "string"
}
