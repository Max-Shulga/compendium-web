import { Title } from '@mantine/core';

import TopicFormFields from '@/app/topics/_components/TopicForm/TopicFormFields';
import LinkAnchor from '@/components/LinkAnchor';
import { ROUTES } from '@/core/constants/routes.constant';

import type { TEditTopicView } from './models/edit-topic-view.model';

const EditTopicView = ({ allCards, topic }: TEditTopicView) => (
  <main style={{ maxWidth: 720, margin: '0 auto', padding: '2.5rem 1rem' }}>
    <LinkAnchor
      c='dimmed'
      href={ROUTES.topics.detail(topic.id)}
      size='sm'
      style={{ display: 'block', marginBottom: '1.5rem' }}
      underline='never'
    >
      ← {topic.name}
    </LinkAnchor>
    <Title order={2} style={{ fontWeight: 400, marginBottom: '1.75rem' }}>Edit topic</Title>
    <TopicFormFields allCards={allCards} topic={topic} />
  </main>
);

export default EditTopicView;
