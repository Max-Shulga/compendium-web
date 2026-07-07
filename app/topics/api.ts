import type {
  TTopic,
  CreateTopicDto,
  UpdateTopicDto,
  UpdateTopicCardsDto
} from '@/app/topics/_models/topics.model';
import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import type { TPaginationQuery } from '@/core/models/paginationQuery.model';
import buildSearch from '@/core/utils/buildSearch.util';
import apiRequest from '@/lib/api/client';
import { HTTP_METHODS } from '@/lib/api/constants/api.constant';

const topicsApi = {
  getAll: (query?: TPaginationQuery): Promise<TTopic[]> =>
    apiRequest(`${API_ENDPOINTS.topics.list}${buildSearch(query)}`),

  getOne: (id: number): Promise<TTopic> =>
    apiRequest(API_ENDPOINTS.topics.detail(id)),

  create: (data: CreateTopicDto): Promise<TTopic> =>
    apiRequest(API_ENDPOINTS.topics.list, { method: HTTP_METHODS.post, body: data }),

  updateTopic: (id: number, data: UpdateTopicDto): Promise<TTopic> =>
    apiRequest(API_ENDPOINTS.topics.detail(id), { method: HTTP_METHODS.patch, body: data }),

  updateCards: (id: number, data: UpdateTopicCardsDto): Promise<void> =>
    apiRequest(API_ENDPOINTS.topics.cards(id), { method: HTTP_METHODS.patch, body: data }),

  remove: (id: number): Promise<void> =>
    apiRequest(API_ENDPOINTS.topics.detail(id), { method: HTTP_METHODS.delete })
};

export { topicsApi };
