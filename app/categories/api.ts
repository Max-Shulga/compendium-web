import type {
  TCategory,
  CreateCategoryDto,
  UpdateCategoryDto,
  UpdateCategoryItemsDto
} from '@/app/categories/_models/categories.model';
import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import type { TPaginationQuery } from '@/core/models/paginationQuery.model';
import buildSearch from '@/core/utils/buildSearch.util';
import apiRequest from '@/lib/api/client';
import { HTTP_METHODS } from '@/lib/api/constants/api.constant';

const categoriesApi = {
  getAll: (query?: TPaginationQuery): Promise<TCategory[]> =>
    apiRequest(`${API_ENDPOINTS.categories.list}${buildSearch(query)}`),

  getOne: (id: number): Promise<TCategory> =>
    apiRequest(API_ENDPOINTS.categories.detail(id)),

  create: (data: CreateCategoryDto): Promise<TCategory> =>
    apiRequest(API_ENDPOINTS.categories.list, { method: HTTP_METHODS.post, body: data }),

  updateCategory: (id: number, data: UpdateCategoryDto): Promise<TCategory> =>
    apiRequest(API_ENDPOINTS.categories.detail(id), { method: HTTP_METHODS.patch, body: data }),

  updateItems: (id: number, data: UpdateCategoryItemsDto): Promise<void> =>
    apiRequest(API_ENDPOINTS.categories.items(id), { method: HTTP_METHODS.patch, body: data }),

  remove: (id: number): Promise<void> =>
    apiRequest(API_ENDPOINTS.categories.detail(id), { method: HTTP_METHODS.delete })
};

export { categoriesApi };
