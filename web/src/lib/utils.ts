import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(value: string) {
  return value
    .normalize('NFKD') // split accented characters into their base characters and accents
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .toLowerCase() // convert to lowercase
    .trim() // remove whitespace from both ends
    .replace(/\s+/g, '-') // replace one or more whitespace chars with single hyphen
    .replace(/[^\w-]+/g, '') // remove all non-word chars except hyphens
    .replace(/_/g, '-') // replace underscores with hyphens
    .replace(/--+/g, '-'); // replace multiple hyphens with single hyphen
}