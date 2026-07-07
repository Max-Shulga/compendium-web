import { Title } from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@/core/constants/routes.constant';

import styles from './CategoryDetail.module.css';
import type { TCategoryDetail } from './models/category-detail.model';
import renderCategoryItem from './utils/renderCategoryItem.util';

const CategoryDetail = ({ category }: TCategoryDetail) => {
  const items = category.categoryItems ?? [];

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link className={styles.backLink} href={ROUTES.categories.list}>
          ← Categories
        </Link>
        <Link className={styles.editLink} href={ROUTES.categories.edit(category.id)}>
          Edit
        </Link>
      </nav>

      <Title order={1} style={{ fontWeight: 400 }}>{category.name}</Title>
      {category.description && (
        <p className={styles.description}>{category.description}</p>
      )}

      {items.length > 0 && (
        <section className={styles.itemsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Items</span>
            <span className={styles.itemCount}>{items.length}</span>
          </div>
          <div className={styles.itemList}>
            {items.map((item) => (
              <div key={item.id}>{renderCategoryItem(item)}</div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoryDetail;
