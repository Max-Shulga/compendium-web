import { useMutation } from '@tanstack/react-query';

import type { TCategory, TCategoryItem } from '@/app/categories/_models/categories.model';
import { CategoryItemType } from '@/app/categories/_models/categories.model';
import { categoriesApi } from '@/app/categories/api';

import type { TCategoryMutationValues } from '../models/categoryForm.model';

const toCategoryItems = ({
  selectedTopicIds,
  selectedCardIds,
  selectedCategoryIds
}: TCategoryMutationValues): TCategoryItem[] => [
  ...selectedTopicIds.map((id) => ({ itemType: CategoryItemType.Topic, itemId: Number(id) })),
  ...selectedCardIds.map((id) => ({ itemType: CategoryItemType.Card, itemId: Number(id) })),
  ...selectedCategoryIds.map((id) => ({ itemType: CategoryItemType.Category, itemId: Number(id) }))
];

const useCategoryMutation = (category?: TCategory) => useMutation({
  mutationFn: async (values: TCategoryMutationValues) => {
    const { name, description } = values;
    const items = toCategoryItems(values);

    if (category) {
      await categoriesApi.updateCategory(category.id,
        { name, description: description.length > 0 ? description : undefined });
      await categoriesApi.updateItems(category.id, { items });

      return category.id;
    }

    const created = await categoriesApi.create({
      name,
      description: description.length > 0 ? description : undefined,
      items
    });

    return created.id;
  }
});

export { useCategoryMutation };
