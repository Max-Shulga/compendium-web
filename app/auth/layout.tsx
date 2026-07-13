import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { redirectIfAuthenticated } from '@/lib/auth/server';

import type { TAuthLayout } from './_models/auth-layout.model';
import classes from './AuthLayout.module.css';

const AuthLayout = async ({ children }: TAuthLayout) => {
  await redirectIfAuthenticated();

  return (
    <div className={classes.wrapper}>
      <div className={classes.panel}>
        <div className={classes.panelLogo}>
          <Logo inverted />
        </div>
        <p className={classes.panelTagline}>Your personal compendium of knowledge.</p>
      </div>

      <div className={classes.main}>
        <header className={classes.header}>
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
