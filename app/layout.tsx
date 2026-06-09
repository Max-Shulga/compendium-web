import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@mantine/core/styles.css';
import 'normalize.css';
import '../styles/reset.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compendium',
  description: 'Compendium'
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <head>
      <ColorSchemeScript />
    </head>
    <body>
      <MantineProvider>{children}</MantineProvider>
    </body>
  </html>
);

export default RootLayout;
