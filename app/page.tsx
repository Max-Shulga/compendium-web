import { topicsApi } from '@/app/topics/api';

import Home from './_components/Home/Home';

const HomePage = async () => {
  const topics = await topicsApi.getAll();

  return <Home topics={topics} />;
};

export default HomePage;
