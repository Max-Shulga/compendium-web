import { notFound } from 'next/navigation';

import { cardsApi } from '@/app/topics/_components/Card/api';
import { topicsApi } from '@/app/topics/api';
import { ApiError } from '@/lib/api/client';
import { HTTP_NOT_FOUND } from '@/lib/api/constants/api.constant';
import { requireRole, Role } from '@/lib/auth/server';

import EditTopicView from './_components/EditTopicView/EditTopicView';
import type { TEditTopicPage } from './_models/edit-topic-page.model';

const EditTopicPage = async ({ params }: TEditTopicPage) => {
  const { id } = await params;
  const topicId = Number(id);

  await requireRole(Role.Emperor);

  let topic;
  try {
    topic = await topicsApi.getOne(topicId);
  } catch (error) {
    if (error instanceof ApiError && error.status === HTTP_NOT_FOUND) notFound();
    throw error;
  }

  const allCards = await cardsApi.getAll();

  return <EditTopicView allCards={allCards} topic={topic} />;
};

export default EditTopicPage;
