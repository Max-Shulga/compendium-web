import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ru'] as const;
type Locale = typeof locales[number];
const defaultLocale: Locale = 'en';

function getLocale(request: NextRequest): Locale {
  const acceptLang = request.headers.get('accept-language') ?? '';
  const primary = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase() ?? '';

  return (locales as readonly string[]).includes(primary)
    ? (primary as Locale)
    : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (hasLocalePrefix) return;
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|icon(?:\\..*)?$).*)', '/']
};
