import { notFound } from 'next/navigation';

import { topicsApi } from '@/app/topics/api';
import { ApiError } from '@/lib/api/client';
import { HTTP_NOT_FOUND } from '@/lib/api/constants/api.constant';
import { requireToken } from '@/lib/auth/server';

import TopicDetail from './_components/TopicDetail/TopicDetail';
import type { TTopicPage } from './_models/topic-page.model';

const TopicPage = async ({ params }: TTopicPage) => {
  const { id } = await params;
  const topicId = Number(id);

  await requireToken();

  let topic;
  try {
    topic = await topicsApi.getOne(topicId);
  } catch (error) {
    if (error instanceof ApiError && error.status === HTTP_NOT_FOUND) notFound();
    throw error;
  }

  return <TopicDetail topic={topic} />;
};

export default TopicPage;
