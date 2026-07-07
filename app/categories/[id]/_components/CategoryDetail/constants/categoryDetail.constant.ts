import { CategoryItemType } from '@/app/categories/_models/categories.model';

const ITEM_TYPE_LABELS: Record<CategoryItemType, string> = {
  [CategoryItemType.Topic]: 'Topic',
  [CategoryItemType.Card]: 'Card',
  [CategoryItemType.Category]: 'Category'
};

export { ITEM_TYPE_LABELS };
