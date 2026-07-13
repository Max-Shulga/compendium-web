'use client';

import { Button, Title } from '@mantine/core';

import type { TErrorPage } from './_models/error-page.model';
import styles from './error.module.css';

const ErrorPage = ({ unstable_retry }: TErrorPage) => (
  <main className={styles.page}>
    <span className={styles.code}>500</span>
    <Title order={1} style={{ fontWeight: 400 }}>Something went wrong</Title>
    <p className={styles.hint}>
      We couldn&apos;t reach the server. Check your connection and try again.
    </p>
    <Button onClick={unstable_retry}>Try again</Button>
  </main>
);

export default ErrorPage;
