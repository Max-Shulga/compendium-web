import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { inter, lora } from '../styles/fonts';
import theme from '../styles/theme';

import '@mantine/core/styles.css';
import 'normalize.css';
import '../styles/reset.css';
import '../styles/tokens.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compendium',
  description: 'Compendium'
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html className={`${inter.variable} ${lora.variable}`} lang='en'>
    <head>
      <ColorSchemeScript defaultColorScheme='auto' />
    </head>
    <body>
      <MantineProvider defaultColorScheme='auto' theme={theme}>{children}</MantineProvider>
    </body>
  </html>
);

export default RootLayout;
