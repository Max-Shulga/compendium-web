import type { TCategory } from '@/app/categories/_models/categories.model';
import type { TCard } from '@/app/topics/_components/Card/models/card.model';
import type { TTopic } from '@/app/topics/_models/topics.model';

type TEditCategoryView = {
  allTopics: TTopic[];
  allCards: TCard[];
  allCategories: TCategory[];
  category: TCategory;
};

export type { TEditCategoryView };
