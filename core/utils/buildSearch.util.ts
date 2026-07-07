import { PAGINATION_PARAMS } from '@/core/constants/pagination.constant';
import type { TPaginationQuery } from '@/core/models/paginationQuery.model';

const buildSearch = (query?: TPaginationQuery): string => {
  const params = new URLSearchParams();
  if (query?.limit !== undefined) params.set(PAGINATION_PARAMS.limit, String(query.limit));
  if (query?.offset !== undefined) params.set(PAGINATION_PARAMS.offset, String(query.offset));
  const queryString = params.toString();

  return queryString ? `?${queryString}` : '';
};

export default buildSearch;
