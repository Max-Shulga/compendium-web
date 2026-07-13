'use client';

import { useState } from 'react';

import { CategoryItemType } from '@/app/categories/_models/categories.model';
import { useCategoryQuery } from '@/app/categories/queries';
import CardPreview from '@/app/topics/_components/CardPreview/CardPreview';
import { useTopicQuery } from '@/app/topics/queries';
import { ROUTES } from '@/core/constants/routes.constant';

import { ITEM_TYPE_LABELS } from '../CategoryDetail/constants/categoryDetail.constant';
import ExpandableRow from '../ExpandableRow/ExpandableRow';

import type { TCategoryItem } from './models/category-item.model';

const CategoryItem = ({ item }: TCategoryItem) => {
  const [expanded, setExpanded] = useState(false);
  const isTopic = item.itemType === CategoryItemType.Topic;
  const isCategory = item.itemType === CategoryItemType.Category;

  const topicQuery = useTopicQuery(item.topic?.id ?? 0, expanded && isTopic);
  const categoryQuery = useCategoryQuery(item.category?.id ?? 0, expanded && isCategory);

  const handleToggle = () => setExpanded((prev) => !prev);

  if (item.itemType === CategoryItemType.Card) {
    return item.card ? <CardPreview card={item.card} /> : null;
  }

  if (isTopic && item.topic) {
    const topic = item.topic;
    const cards = (topicQuery.data?.topicCards ?? topic.topicCards ?? [])
      .slice()
      .sort((firstCard, secondCard) => firstCard.order - secondCard.order);

    return (
      <ExpandableRow
        description={topic.description}
        expanded={expanded}
        href={ROUTES.topics.detail(topic.id)}
        loading={topicQuery.isLoading}
        title={topic.name}
        typeLabel={ITEM_TYPE_LABELS[CategoryItemType.Topic]}
        variant='topic'
        onToggle={handleToggle}
      >
        {cards.map((topicCard) => <CardPreview card={topicCard.card} key={topicCard.id} />)}
      </ExpandableRow>
    );
  }

  if (isCategory && item.category) {
    const category = item.category;
    const nestedItems = categoryQuery.data?.categoryItems ?? category.categoryItems ?? [];

    return (
      <ExpandableRow
        description={category.description}
        expanded={expanded}
        href={ROUTES.categories.detail(category.id)}
        loading={categoryQuery.isLoading}
        title={category.name}
        typeLabel={ITEM_TYPE_LABELS[CategoryItemType.Category]}
        variant='category'
        onToggle={handleToggle}
      >
        {nestedItems.map((nestedItem) => <CategoryItem item={nestedItem} key={nestedItem.id} />)}
      </ExpandableRow>
    );
  }

  return null;
};

export default CategoryItem;
