import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDateWithoutTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
