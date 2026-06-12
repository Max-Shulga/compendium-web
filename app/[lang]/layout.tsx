import type { ReactNode } from 'react';

import { locales } from './dictionaries';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const LangLayout = ({ children }: { children: ReactNode }) => children;

export default LangLayout;
