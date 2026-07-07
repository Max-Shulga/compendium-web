import { Title } from '@mantine/core';

import { cardsApi } from '@/app/topics/_components/Card/api';
import LinkAnchor from '@/components/LinkAnchor';
import { ROUTES } from '@/core/constants/routes.constant';
import { requireRole, Role } from '@/lib/auth/server';

import TopicFormFields from '../_components/TopicForm/TopicFormFields';

const NewTopicPage = async () => {
  await requireRole(Role.Emperor);
  const allCards = await cardsApi.getAll();

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1rem' }}>
      <LinkAnchor
        c='dimmed'
        href={ROUTES.topics.list}
        size='sm'
        style={{ display: 'block', marginBottom: '1.5rem' }}
        underline='never'
      >
        ← Topics
      </LinkAnchor>
      <Title order={2} style={{ fontWeight: 400, marginBottom: '1.75rem' }}>New topic</Title>
      <TopicFormFields allCards={allCards} />
    </main>
  );
};

export default NewTopicPage;
