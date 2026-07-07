import { notFound } from 'next/navigation';

import { categoriesApi } from '@/app/categories/api';
import { ApiError } from '@/lib/api/client';
import { HTTP_NOT_FOUND } from '@/lib/api/constants/api.constant';
import { requireToken } from '@/lib/auth/server';

import CategoryDetail from './_components/CategoryDetail/CategoryDetail';
import type { TCategoryPage } from './_models/category-page.model';

const CategoryPage = async ({ params }: TCategoryPage) => {
  const { id } = await params;
  const categoryId = Number(id);

  await requireToken();

  let category;
  try {
    category = await categoriesApi.getOne(categoryId);
  } catch (error) {
    if (error instanceof ApiError && error.status === HTTP_NOT_FOUND) notFound();
    throw error;
  }

  return <CategoryDetail category={category} />;
};

export default CategoryPage;
