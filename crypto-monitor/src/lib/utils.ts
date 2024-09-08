import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDateWithoutTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDateOneYearBefore(date: Date): Date {
  const oneYearBefore = new Date(date);
  oneYearBefore.setFullYear(date.getFullYear() - 1);
  return oneYearBefore;
}

export const getCacheKey = (coinId: string) => {
  const today = toDateWithoutTime(new Date());
  const oneYearBefore = getDateOneYearBefore(today);

  return `${coinId}-${oneYearBefore.getTime()}-${today.getTime()}`;
}