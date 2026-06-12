import type { ReactNode } from 'react';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

import type { Locale } from '../dictionaries';
import { defaultLocale, getDictionary, hasLocale } from '../dictionaries';

import classes from './AuthLayout.module.css';

const AuthLayout = async ({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <div className={classes.wrapper}>
      <div className={classes.panel}>
        <div className={classes.panelLogo}>
          <Logo inverted />
        </div>
        <p className={classes.panelTagline}>{dict.auth.panel.tagline}</p>
      </div>

      <div className={classes.main}>
        <header className={classes.header}>
          <LanguageSwitcher lang={locale} />
          <ThemeToggle />
        </header>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
