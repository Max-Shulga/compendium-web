import { Title } from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@/core/constants/routes.constant';

import styles from './CategoriesList.module.css';
import type { TCategoriesList } from './models/categories-list.model';

const CategoriesList = ({ categories }: TCategoriesList) => (
  <main className={styles.page}>
    <div className={styles.header}>
      <Title order={1} style={{ fontWeight: 400 }}>Categories</Title>
      <Link className={styles.newLink} href={ROUTES.categories.new}>
        New category
      </Link>
    </div>
    {categories.length === 0 ? (
      <div className={styles.empty}>
        <p>No categories yet.</p>
        <p className={styles.emptyHint}>
          <Link className={styles.newLink} href={ROUTES.categories.new}>
            Create your first category
          </Link>
          to start organizing your topics and cards.
        </p>
      </div>
    ) : (
      <div className={styles.list}>
        {categories.map((category) => {
          const count = category.categoryItems?.length ?? 0;

          return (
            <Link
              className={styles.categoryCard}
              href={ROUTES.categories.detail(category.id)}
              key={category.id}
            >
              <div className={styles.categoryMeta}>
                <span className={styles.categoryName}>{category.name}</span>
                {count > 0 && (
                  <span className={styles.categoryCount}>
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              {category.description && (
                <p className={styles.categoryDescription}>{category.description}</p>
              )}
            </Link>
          );
        })}
      </div>
    )}
  </main>
);

export default CategoriesList;
