import type { TInterviewTopic } from '@/app/interview-topics/_models/interview-topics.model';
import { API_ENDPOINTS } from '@/core/constants/api-endpoints.constant';
import type { TPaginationQuery } from '@/core/models/paginationQuery.model';
import buildSearch from '@/core/utils/buildSearch.util';
import orEmptyArray from '@/core/utils/orEmptyArray.util';
import apiRequest from '@/lib/api/client';

const interviewTopicsApi = {
  getAll: (query?: TPaginationQuery): Promise<TInterviewTopic[]> =>
    apiRequest<TInterviewTopic[]>(`${API_ENDPOINTS.interviewTopics.list}${buildSearch(query)}`)
      .then(orEmptyArray)
      .catch(() => []),

  getOne: (id: number): Promise<TInterviewTopic> =>
    apiRequest(API_ENDPOINTS.interviewTopics.detail(id))
};

export { interviewTopicsApi };
