import { useQuery } from '@tanstack/react-query';

import { CATEGORIES_QUERY_KEYS } from './_constants/categoriesQueryKeys.constant';
import { categoriesApi } from './api';

const useCategoryQuery = (id: number, enabled: boolean) => useQuery({
  queryKey: CATEGORIES_QUERY_KEYS.detail(id),
  queryFn: () => categoriesApi.getOne(id),
  enabled
});

export { useCategoryQuery };
