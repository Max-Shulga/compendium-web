import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import type { TPaginationQuery } from '@/core/models/paginationQuery.model';
import buildSearch from '@/core/utils/buildSearch.util';
import orEmptyArray from '@/core/utils/orEmptyArray.util';
import apiRequest from '@/lib/api/client';
import { HTTP_METHODS } from '@/lib/api/constants/api.constant';

import type { CreateCardDto, TCard, UpdateCardDto } from './models/card.model';

const cardsApi = {
  getAll: (query?: TPaginationQuery): Promise<TCard[]> =>
    apiRequest<TCard[]>(`${API_ENDPOINTS.cards.list}${buildSearch(query)}`)
      .then(orEmptyArray)
      .catch(() => []),

  getOne: (id: number): Promise<TCard> =>
    apiRequest(API_ENDPOINTS.cards.detail(id)),

  create: (data: CreateCardDto): Promise<TCard> =>
    apiRequest(API_ENDPOINTS.cards.list, { method: HTTP_METHODS.post, body: data }),

  update: (id: number, data: UpdateCardDto): Promise<TCard> =>
    apiRequest(API_ENDPOINTS.cards.detail(id), { method: HTTP_METHODS.patch, body: data }),

  remove: (id: number): Promise<void> =>
    apiRequest(API_ENDPOINTS.cards.detail(id), { method: HTTP_METHODS.delete })
};

export { cardsApi };
