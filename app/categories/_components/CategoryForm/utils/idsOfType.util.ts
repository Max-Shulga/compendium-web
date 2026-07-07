import type { CategoryItemType, TCategory } from '@/app/categories/_models/categories.model';

const itemId = (item: NonNullable<TCategory['categoryItems']>[number]): number | undefined =>
  item.topic?.id ?? item.card?.id ?? item.category?.id;

const idsOfType = (category: TCategory | undefined, itemType: CategoryItemType): string[] =>
  category?.categoryItems
    ?.filter((item) => item.itemType === itemType)
    .sort((firstItem, secondItem) => firstItem.order - secondItem.order)
    .map((item) => String(itemId(item))) ?? [];

export default idsOfType;
