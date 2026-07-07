import type { TCard } from '@/app/topics/_components/Card/models/card.model';
import type { TTopic } from '@/app/topics/_models/topics.model';

enum CategoryItemType {
  Topic = 'topic',
  Card = 'card',
  Category = 'category'
}

type TCategoryItem = {
  itemType: CategoryItemType;
  itemId: number;
};

type TCategoryItemView = {
  id: number;
  itemType: CategoryItemType;
  order: number;
  topic?: TTopic;
  card?: TCard;
  category?: TCategory;
};

type TCategory = {
  id: number;
  name: string;
  description?: string;
  categoryItems?: TCategoryItemView[];
  createdAt: string;
  updatedAt: string;
};

type CreateCategoryDto = {
  name: string;
  description?: string;
  items?: TCategoryItem[];
};

type UpdateCategoryDto = {
  name?: string;
  description?: string;
};

type UpdateCategoryItemsDto = {
  items: TCategoryItem[];
};

export { CategoryItemType };
export type {
  TCategory,
  TCategoryItem,
  TCategoryItemView,
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdateCategoryItemsDto
};
