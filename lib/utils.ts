import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// utility functions
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


// action result type
export type ActionResult<T> =
  | { success: true; data: T | null; error: null }
  | { success: false; data: null; error: string }


