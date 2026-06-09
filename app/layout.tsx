import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import 'normalize.css';
import '../styles/reset.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compendium',
  description: 'Compendium'
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <body>{children}</body>
  </html>
);

export default RootLayout;
