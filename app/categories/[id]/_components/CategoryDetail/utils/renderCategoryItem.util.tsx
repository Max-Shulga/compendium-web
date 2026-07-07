import Link from 'next/link';
import type { ReactNode } from 'react';

import type { TCategoryItemView } from '@/app/categories/_models/categories.model';
import { CategoryItemType } from '@/app/categories/_models/categories.model';
import { ROUTES } from '@/core/constants/routes.constant';

import styles from '../CategoryDetail.module.css';
import { ITEM_TYPE_LABELS } from '../constants/categoryDetail.constant';
import type { TItemRenderer } from '../models/category-detail.model';

const renderTopicItem: TItemRenderer = (item) => {
  if (!item.topic) return null;

  return (
    <Link
      className={`${styles.item} ${styles.itemTopic}`}
      href={ROUTES.topics.detail(item.topic.id)}
    >
      <div className={styles.itemMeta}>
        <span className={styles.itemType}>{ITEM_TYPE_LABELS[CategoryItemType.Topic]}</span>
        <p className={styles.itemTitle}>{item.topic.name}</p>
      </div>
      {item.topic.description && (
        <p className={styles.itemPreview}>{item.topic.description}</p>
      )}
    </Link>
  );
};

const renderCardItem: TItemRenderer = (item) => {
  if (!item.card) return null;

  return (
    <div className={`${styles.item} ${styles.itemCard}`}>
      <div className={styles.itemMeta}>
        <span className={styles.itemType}>{ITEM_TYPE_LABELS[CategoryItemType.Card]}</span>
        <p className={styles.itemTitle}>{item.card.title}</p>
      </div>
      {item.card.text && <p className={styles.itemPreview}>{item.card.text}</p>}
    </div>
  );
};

const renderNestedCategoryItem: TItemRenderer = (item) => {
  if (!item.category) return null;

  return (
    <Link
      className={`${styles.item} ${styles.itemCategory}`}
      href={ROUTES.categories.detail(item.category.id)}
    >
      <div className={styles.itemMeta}>
        <span className={styles.itemType}>{ITEM_TYPE_LABELS[CategoryItemType.Category]}</span>
        <p className={styles.itemTitle}>{item.category.name}</p>
      </div>
      {item.category.description && (
        <p className={styles.itemPreview}>{item.category.description}</p>
      )}
    </Link>
  );
};

const ITEM_RENDERERS: Record<CategoryItemType, TItemRenderer> = {
  [CategoryItemType.Topic]: renderTopicItem,
  [CategoryItemType.Card]: renderCardItem,
  [CategoryItemType.Category]: renderNestedCategoryItem
};

const renderCategoryItem = (item: TCategoryItemView): ReactNode =>
  ITEM_RENDERERS[item.itemType](item);

export default renderCategoryItem;
