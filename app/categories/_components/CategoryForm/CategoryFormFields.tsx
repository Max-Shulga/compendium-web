'use client';

import { Alert, Button, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { CategoryItemType } from '@/app/categories/_models/categories.model';
import { categoriesApi } from '@/app/categories/api';
import { useCardMutation } from '@/app/topics/_components/Card/mutations/card.mutation';
import { cardSchema } from '@/app/topics/_components/Card/schemas/card.schema';
import { topicSchema } from '@/app/topics/_components/TopicForm/schemas/topic.schema';
import { topicsApi } from '@/app/topics/api';
import { ROUTES } from '@/core/constants/routes.constant';
import zodResolver from '@/lib/zodResolver';

import RelatedItemsSection from './_components/RelatedItemsSection/RelatedItemsSection';
import styles from './CategoryForm.module.css';
import { useRelatedItemsField } from './hooks/useRelatedItemsField.hook';
import type { TCategoryForm } from './models/categoryForm.model';
import { useCategoryMutation } from './mutations/category.mutation';
import { categorySchema } from './schemas/category.schema';
import idsOfType from './utils/idsOfType.util';

const CategoryFormFields = ({
  allTopics: initialTopics,
  allCards: initialCards,
  allCategories: initialCategories,
  category
}: TCategoryForm) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: category?.name ?? '',
      description: category?.description ?? ''
    },
    validate: zodResolver(categorySchema)
  });

  const subcategoryField = useRelatedItemsField({
    initialItems: initialCategories,
    initialSelectedIds: idsOfType(category, CategoryItemType.Category),
    formInitialValues: { name: '', description: '' },
    validate: zodResolver(categorySchema),
    mutation: useMutation({ mutationFn: categoriesApi.create }),
    toMutationInput: ({ name, description }) => ({
      name,
      description: description.length > 0 ? description : undefined
    }),
    getItemId: (item) => item.id
  });

  const topicField = useRelatedItemsField({
    initialItems: initialTopics,
    initialSelectedIds: idsOfType(category, CategoryItemType.Topic),
    formInitialValues: { name: '', description: '' },
    validate: zodResolver(topicSchema),
    mutation: useMutation({ mutationFn: topicsApi.create }),
    toMutationInput: ({ name, description }) => ({
      name,
      description: description.length > 0 ? description : undefined
    }),
    getItemId: (item) => item.id
  });

  const cardField = useRelatedItemsField({
    initialItems: initialCards,
    initialSelectedIds: idsOfType(category, CategoryItemType.Card),
    formInitialValues: { title: '', text: '', examples: '' },
    validate: zodResolver(cardSchema),
    mutation: useCardMutation(),
    toMutationInput: (values) => values,
    getItemId: (item) => item.id
  });

  const saveCategoryMutation = useCategoryMutation(category);

  const handleSubmit = form.onSubmit(({ name, description }) =>
    saveCategoryMutation.mutate(
      {
        name,
        description,
        selectedTopicIds: topicField.selectedIds,
        selectedCardIds: cardField.selectedIds,
        selectedCategoryIds: subcategoryField.selectedIds
      },
      { onSuccess: (id) => router.push(ROUTES.categories.detail(id)) }
    ));

  const categoryOptions = subcategoryField.items
    .filter((option) => option.id !== category?.id)
    .map((option) => ({ value: String(option.id), label: option.name }));
  const topicOptions = topicField.items.map((topic) => ({
    value: String(topic.id),
    label: topic.name
  }));
  const cardOptions = cardField.items.map((card) => ({
    value: String(card.id),
    label: card.title
  }));

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

        <RelatedItemsSection
          addButtonLabel='+ New sub-category'
          errorMessage={
            subcategoryField.mutation.error instanceof Error
              ? subcategoryField.mutation.error.message
              : 'Failed to create sub-category'
          }
          isError={subcategoryField.mutation.isError}
          isFormOpen={subcategoryField.isFormOpen}
          isPending={subcategoryField.mutation.isPending}
          label='Sub-categories'
          nothingFoundMessage='No categories found'
          options={categoryOptions}
          placeholder='Select sub-categories to include'
          selectedIds={subcategoryField.selectedIds}
          showCreateNew={Boolean(category)}
          onSelectionChange={subcategoryField.setSelectedIds}
          onSubmitNew={subcategoryField.handleAdd}
          onToggleForm={subcategoryField.toggleForm}
        >
          <TextInput label='Name' {...subcategoryField.form.getInputProps('name')} />
          <Textarea
            autosize
            label='Description'
            minRows={2}
            {...subcategoryField.form.getInputProps('description')}
          />
        </RelatedItemsSection>

        <RelatedItemsSection
          addButtonLabel='+ New topic'
          errorMessage={
            topicField.mutation.error instanceof Error
              ? topicField.mutation.error.message
              : 'Failed to create topic'
          }
          isError={topicField.mutation.isError}
          isFormOpen={topicField.isFormOpen}
          isPending={topicField.mutation.isPending}
          label='Topics'
          nothingFoundMessage='No topics found'
          options={topicOptions}
          placeholder='Select topics to include'
          selectedIds={topicField.selectedIds}
          showCreateNew={Boolean(category)}
          onSelectionChange={topicField.setSelectedIds}
          onSubmitNew={topicField.handleAdd}
          onToggleForm={topicField.toggleForm}
        >
          <TextInput label='Name' {...topicField.form.getInputProps('name')} />
          <Textarea
            autosize
            label='Description'
            minRows={2}
            {...topicField.form.getInputProps('description')}
          />
        </RelatedItemsSection>

        <RelatedItemsSection
          addButtonLabel='+ New card'
          errorMessage={
            cardField.mutation.error instanceof Error
              ? cardField.mutation.error.message
              : 'Failed to create card'
          }
          isError={cardField.mutation.isError}
          isFormOpen={cardField.isFormOpen}
          isPending={cardField.mutation.isPending}
          label='Cards'
          nothingFoundMessage='No cards found'
          options={cardOptions}
          placeholder='Select cards to include'
          selectedIds={cardField.selectedIds}
          showCreateNew={Boolean(category)}
          onSelectionChange={cardField.setSelectedIds}
          onSubmitNew={cardField.handleAdd}
          onToggleForm={cardField.toggleForm}
        >
          <TextInput label='Card title' {...cardField.form.getInputProps('title')} />
          <Textarea
            autosize
            label='Card text'
            minRows={3}
            {...cardField.form.getInputProps('text')}
          />
          <Textarea
            autosize
            label='Examples'
            minRows={2}
            {...cardField.form.getInputProps('examples')}
          />
        </RelatedItemsSection>

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
