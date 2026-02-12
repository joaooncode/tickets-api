import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getExtension(file: File) {
  return file.name.split(".").pop()?.toLowerCase()
}

export function isAllowedExtension(file: File, allowed: string[]) {
  const ext = getExtension(file)
  return !!ext && allowed.includes(ext)
}
