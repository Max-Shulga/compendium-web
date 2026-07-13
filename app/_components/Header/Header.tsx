import Link from 'next/link';

import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { ROUTES } from '@/core/constants/routes.constant';

import classes from './Header.module.css';

const Header = () => (
  <header className={classes.header}>
    <div className={classes.inner}>
      <Link className={classes.logo} href={ROUTES.home}>
        <Logo />
      </Link>
      <nav aria-label='Primary' className={classes.nav}>
        <Link className={classes.link} href={ROUTES.topics.list}>Topics</Link>
        <Link className={classes.link} href={ROUTES.categories.list}>Categories</Link>
      </nav>
      <ThemeToggle />
    </div>
  </header>
);

export default Header;
