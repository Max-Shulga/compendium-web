import type { TCategory } from '@/app/categories/_models/categories.model';
import type { TCard } from '@/app/topics/_components/Card/models/card.model';
import type { TTopic } from '@/app/topics/_models/topics.model';

type TCategoryForm = {
  allTopics: TTopic[];
  allCards: TCard[];
  allCategories: TCategory[];
  category?: TCategory;
};

type TCategoryMutationValues = {
  name: string;
  description: string;
  selectedTopicIds: string[];
  selectedCardIds: string[];
  selectedCategoryIds: string[];
};

export type { TCategoryForm, TCategoryMutationValues };
