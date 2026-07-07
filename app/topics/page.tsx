import { topicsApi } from '@/app/topics/api';

import TopicsList from './_components/TopicsList/TopicsList';

const TopicsPage = async () => {
  const topics = await topicsApi.getAll();

  return <TopicsList topics={topics} />;
};

export default TopicsPage;
