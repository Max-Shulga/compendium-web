import { Title } from '@mantine/core';

import { categoriesApi } from '@/app/categories/api';
import { cardsApi } from '@/app/topics/_components/Card/api';
import { topicsApi } from '@/app/topics/api';
import LinkAnchor from '@/components/LinkAnchor';
import { ROUTES } from '@/core/constants/routes.constant';
import { requireRole, Role } from '@/lib/auth/server';

import CategoryFormFields from '../_components/CategoryForm/CategoryFormFields';

const NewCategoryPage = async () => {
  await requireRole(Role.Emperor);

  const [allTopics, allCards, allCategories] = await Promise.all([
    topicsApi.getAll(),
    cardsApi.getAll(),
    categoriesApi.getAll()
  ]);

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1rem' }}>
      <LinkAnchor
        c='dimmed'
        href={ROUTES.categories.list}
        size='sm'
        style={{ display: 'block', marginBottom: '1.5rem' }}
        underline='never'
      >
        ← Categories
      </LinkAnchor>
      <Title order={2} style={{ fontWeight: 400, marginBottom: '1.75rem' }}>New category</Title>
      <CategoryFormFields allCards={allCards} allCategories={allCategories} allTopics={allTopics} />
    </main>
  );
};

export default NewCategoryPage;
