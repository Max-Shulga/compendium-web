import ThemeToggle from '@/components/ThemeToggle';

import type { TCategoriesLayout } from './_models/categories-layout.model';
import classes from './CategoriesLayout.module.css';

const CategoriesLayout = ({ children }: TCategoriesLayout) => (
  <>
    <header className={classes.header}>
      <ThemeToggle />
    </header>
    {children}
  </>
);

export default CategoriesLayout;
