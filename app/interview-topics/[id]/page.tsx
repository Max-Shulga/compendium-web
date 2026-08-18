import { notFound } from 'next/navigation';

import { interviewTopicsApi } from '@/app/interview-topics/api';
import { ApiError } from '@/lib/api/client';
import { HTTP_NOT_FOUND } from '@/lib/api/constants/api.constant';

import InterviewTopicDetail from './_components/InterviewTopicDetail/InterviewTopicDetail';
import type { TInterviewTopicPage } from './_models/interview-topic-page.model';

const InterviewTopicPage = async ({ params }: TInterviewTopicPage) => {
  const { id } = await params;
  const topicId = Number(id);

  let topic;
  try {
    topic = await interviewTopicsApi.getOne(topicId);
  } catch (error) {
    if (error instanceof ApiError && error.status === HTTP_NOT_FOUND) notFound();
    throw error;
  }

  return <InterviewTopicDetail topic={topic} />;
};

export default InterviewTopicPage;
