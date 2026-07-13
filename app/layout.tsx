import { MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compendium',
  description: 'Compendium'
};

import Header from './_components/Header';

import QueryProvider from '@/lib/query/QueryProvider';
import { inter, lora } from '@/styles/fonts';
import theme from '@/styles/theme';

import '@mantine/core/styles.css';
import 'normalize.css';
import '@/styles/reset.css';
import '@/styles/tokens.css';
import './globals.css';

import type { TRootLayout } from './_models/root-layout.model';

const RootLayout = ({ children }: TRootLayout) => (
  <html suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
    <body suppressHydrationWarning>
      <MantineProvider defaultColorScheme='auto' theme={theme}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </MantineProvider>
    </body>
  </html>
);

export default RootLayout;
