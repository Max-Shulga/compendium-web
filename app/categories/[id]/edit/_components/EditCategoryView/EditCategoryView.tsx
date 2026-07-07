import { Title } from '@mantine/core';

import CategoryFormFields from '@/app/categories/_components/CategoryForm/CategoryFormFields';
import LinkAnchor from '@/components/LinkAnchor';
import { ROUTES } from '@/core/constants/routes.constant';

import type { TEditCategoryView } from './models/edit-category-view.model';

const EditCategoryView = ({ allTopics, allCards, allCategories, category }: TEditCategoryView) => (
  <main style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1rem' }}>
    <LinkAnchor
      c='dimmed'
      href={ROUTES.categories.detail(category.id)}
      size='sm'
      style={{ display: 'block', marginBottom: '1.5rem' }}
      underline='never'
    >
      ← {category.name}
    </LinkAnchor>
    <Title order={2} style={{ fontWeight: 400, marginBottom: '1.75rem' }}>Edit category</Title>
    <CategoryFormFields
      allCards={allCards}
      allCategories={allCategories}
      allTopics={allTopics}
      category={category}
    />
  </main>
);

export default EditCategoryView;
