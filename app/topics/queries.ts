import { useQuery } from '@tanstack/react-query';

import { TOPICS_QUERY_KEYS } from './_constants/topicsQueryKeys.constant';
import { topicsApi } from './api';

const useTopicQuery = (id: number, enabled: boolean) => useQuery({
  queryKey: TOPICS_QUERY_KEYS.detail(id),
  queryFn: () => topicsApi.getOne(id),
  enabled
});

export { useTopicQuery };
