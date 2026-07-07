import { notFound } from 'next/navigation';

import { categoriesApi } from '@/app/categories/api';
import { cardsApi } from '@/app/topics/_components/Card/api';
import { topicsApi } from '@/app/topics/api';
import { ApiError } from '@/lib/api/client';
import { HTTP_NOT_FOUND } from '@/lib/api/constants/api.constant';
import { requireRole, Role } from '@/lib/auth/server';

import EditCategoryView from './_components/EditCategoryView/EditCategoryView';
import type { TEditCategoryPage } from './_models/edit-category-page.model';

const EditCategoryPage = async ({ params }: TEditCategoryPage) => {
  const { id } = await params;
  const categoryId = Number(id);

  await requireRole(Role.Emperor);

  let category;
  try {
    category = await categoriesApi.getOne(categoryId);
  } catch (error) {
    if (error instanceof ApiError && error.status === HTTP_NOT_FOUND) notFound();
    throw error;
  }

  const [allTopics, allCards, allCategories] = await Promise.all([
    topicsApi.getAll(),
    cardsApi.getAll(),
    categoriesApi.getAll()
  ]);

  return (
    <EditCategoryView
      allCards={allCards}
      allCategories={allCategories}
      allTopics={allTopics}
      category={category}
    />
  );
};

export default EditCategoryPage;
