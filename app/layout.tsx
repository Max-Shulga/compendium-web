import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Compendium',
  description: 'Compendium'
};

import { inter, lora } from '@/styles/fonts';
import theme from '@/styles/theme';

import '@mantine/core/styles.css';
import 'normalize.css';
import '@/styles/reset.css';
import '@/styles/tokens.css';
import './globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
    <head>
      <ColorSchemeScript defaultColorScheme='auto' />
    </head>
    <body suppressHydrationWarning>
      <MantineProvider defaultColorScheme='auto' theme={theme}>{children}</MantineProvider>
    </body>
  </html>
);

export default RootLayout;
