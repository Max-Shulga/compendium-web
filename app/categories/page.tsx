import { categoriesApi } from '@/app/categories/api';

import CategoriesList from './_components/CategoriesList/CategoriesList';

const CategoriesPage = async () => {
  const categories = await categoriesApi.getAll();

  return <CategoriesList categories={categories} />;
};

export default CategoriesPage;
