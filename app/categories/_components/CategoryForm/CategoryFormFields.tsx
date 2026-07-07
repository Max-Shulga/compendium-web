'use client';

import { Alert, Button, MultiSelect, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';

import { CategoryItemType } from '@/app/categories/_models/categories.model';
import { ROUTES } from '@/core/constants/routes.constant';
import zodResolver from '@/lib/zodResolver';

import styles from './CategoryForm.module.css';
import type { TCategoryForm } from './models/categoryForm.model';
import { useCategoryMutation } from './mutations/category.mutation';
import { categorySchema } from './schemas/category.schema';
import idsOfType from './utils/idsOfType.util';

const CategoryFormFields = ({ allTopics, allCards, allCategories, category }: TCategoryForm) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: category?.name ?? '',
      description: category?.description ?? '',
      selectedTopicIds: idsOfType(category, CategoryItemType.Topic),
      selectedCardIds: idsOfType(category, CategoryItemType.Card),
      selectedCategoryIds: idsOfType(category, CategoryItemType.Category)
    },
    validate: zodResolver(categorySchema)
  });

  const saveCategoryMutation = useCategoryMutation(category);

  const handleSubmit = form.onSubmit((values) =>
    saveCategoryMutation.mutate(values, {
      onSuccess: (id) => router.push(ROUTES.categories.detail(id))
    }));

  const topicOptions = allTopics.map((topic) => ({ value: String(topic.id), label: topic.name }));
  const cardOptions = allCards.map((card) => ({ value: String(card.id), label: card.title }));
  const categoryOptions = allCategories
    .filter((option) => option.id !== category?.id)
    .map((option) => ({ value: String(option.id), label: option.name }));

  const cancelHref = category ? ROUTES.categories.detail(category.id) : ROUTES.categories.list;

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap='lg'>
        {saveCategoryMutation.isError && (
          <Alert color='red' variant='light'>
            {saveCategoryMutation.error instanceof Error
              ? saveCategoryMutation.error.message
              : 'Something went wrong'}
          </Alert>
        )}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Category</span>
          <Stack gap='md'>
            <TextInput label='Name' {...form.getInputProps('name')} />
            <Textarea
              autosize
              label='Description'
              minRows={2}
              {...form.getInputProps('description')}
            />
          </Stack>
        </div>
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Items</span>
          <div className={styles.itemPickers}>
            <MultiSelect
              searchable
              data={topicOptions}
              label='Topics'
              nothingFoundMessage='No topics found'
              placeholder='Select topics to include'
              {...form.getInputProps('selectedTopicIds')}
            />
            <MultiSelect
              searchable
              data={cardOptions}
              label='Cards'
              nothingFoundMessage='No cards found'
              placeholder='Select cards to include'
              {...form.getInputProps('selectedCardIds')}
            />
            <MultiSelect
              searchable
              data={categoryOptions}
              label='Sub-categories'
              nothingFoundMessage='No categories found'
              placeholder='Select categories to include'
              {...form.getInputProps('selectedCategoryIds')}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            color='gray'
            type='button'
            variant='subtle'
            onClick={() => router.push(cancelHref)}
          >
            Cancel
          </Button>
          <Button loading={saveCategoryMutation.isPending} type='submit'>
            {category ? 'Save changes' : 'Create category'}
          </Button>
        </div>
      </Stack>
    </form>
  );
};

export default CategoryFormFields;
