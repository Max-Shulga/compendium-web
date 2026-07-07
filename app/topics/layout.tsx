import ThemeToggle from '@/components/ThemeToggle';

import type { TTopicsLayout } from './_models/topics-layout.model';
import classes from './TopicsLayout.module.css';

const TopicsLayout = ({ children }: TTopicsLayout) => (
  <>
    <header className={classes.header}>
      <ThemeToggle />
    </header>
    {children}
  </>
);

export default TopicsLayout;
