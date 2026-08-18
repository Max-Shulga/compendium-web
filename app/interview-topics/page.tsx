import { interviewTopicsApi } from '@/app/interview-topics/api';

import InterviewTopicsList from './_components/InterviewTopicsList/InterviewTopicsList';

const InterviewTopicsPage = async () => {
  const topics = await interviewTopicsApi.getAll();

  return <InterviewTopicsList topics={topics} />;
};

export default InterviewTopicsPage;
