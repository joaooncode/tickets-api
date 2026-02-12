"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, XIcon } from "lucide-react"
import { getExtension, isAllowedExtension } from "@/lib/utils"
import { toast } from "sonner"

type Props = {
    value: File[]
    onChange: (files: File[]) => void
    maxFiles?: number,
    extensions?: string[]
}

export function InputImageDropzone({
    value,
    onChange,
    maxFiles = 5,
    extensions = ["jpg", "jpeg", "png",],
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null)

    const files = value ?? []

    function handleFiles(selected: FileList | null) {
        console.log("handleFiles", selected)
        if (!selected) return

        const allowed = extensions.map(e => e.toLowerCase())

        const validFiles = Array.from(selected).filter(file => {
            console.log("file", file)
            // 1️⃣ MIME
            if (!file.type.startsWith("image/") || !isAllowedExtension(file, allowed)) {
                toast.error(`Arquivo ${file.name} não é uma imagem JPG, JPEG ou PNG`)
                return false
            }

            return true
        })

        const rejected = Array.from(selected).filter(file => {
            if (!file.type.startsWith("image/")) return true
            if (!isAllowedExtension(file, allowed)) return true
            return false
        })

        if (rejected.length > 0) {
            console.log("rejected", rejected)
            return
        }

        const remaining = maxFiles - files.length
        onChange([...files, ...validFiles.slice(0, remaining)])
    }


    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        console.log("handleDrop", e.dataTransfer.files)
        e.preventDefault()
        handleFiles(e.dataTransfer.files)
    }

    function removeFile(index: number) {
        onChange(files.filter((_, i) => i !== index))
    }




    return (
        <>
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                className="cursor-pointer rounded-lg border-2 border-dashed p-6 text-center hover:bg-muted"
            >
                <p className="text-sm text-muted-foreground">
                    Arraste imagens ou clique para selecionar
                </p>
                {/* extensão de arquivos permitidos */}
                <p className="text-xs text-muted-foreground">
                    Extensões permitidas: {extensions.join(", ")}
                </p>
                <p className="text-xs text-muted-foreground">
                    Máx: {maxFiles} arquivos
                </p>
                <p className="text-xs text-muted-foreground">
                    {files.length} arquivos selecionados
                </p>

                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    hidden
                    accept={extensions.map(e => `image/${e}`).join(",")}
                    onChange={(e) => {
                        handleFiles(e.target.files)
                        e.target.value = ''
                    }}
                />

            </div>


            {files.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="h-24 w-full rounded object-cover"
                            />
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute right-1 top-1 cursor-pointer"
                                onClick={() => removeFile(index)}
                            >
                                <XIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
