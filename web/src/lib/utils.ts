import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  if (!name) return '';

  const names = name.trim().split(' ').filter(n => n.length > 0);

  if (names.length === 0) {
    return ''
  };

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  };

  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
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

export function formatDate(date: string, withTime: boolean = false) {
  const pattern = withTime
    ? "d 'de' MMMM, yyyy 'às' HH:mm:ss"
    : "d 'de' MMMM, yyyy";

  return format(new Date(date), pattern, { locale: ptBR });
}


export function decodeJwtPayload(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = Buffer.from(payload, 'base64url').toString();
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}