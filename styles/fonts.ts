import { Inter, Lora } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap'
});

export const lora = Lora({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-lora',
  display: 'swap'
});
