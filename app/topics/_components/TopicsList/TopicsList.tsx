import { Title } from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@/core/constants/routes.constant';

import type { TTopicsList } from './models/topics-list.model';
import styles from './TopicsList.module.css';

const TopicsList = ({ topics }: TTopicsList) => (
  <main className={styles.page}>
    <div className={styles.header}>
      <Title order={1} style={{ fontWeight: 400 }}>Topics</Title>
      <Link className={styles.newLink} href={ROUTES.topics.new}>
        New topic
      </Link>
    </div>
    {topics.length === 0 ? (
      <div className={styles.empty}>
        <p>No topics yet.</p>
        <p className={styles.emptyHint}>
          <Link className={styles.newLink} href={ROUTES.topics.new}>
            Create your first topic
          </Link>
          to start organizing your materials.
        </p>
      </div>
    ) : (
      <div className={styles.list}>
        {topics.map((topic) => {
          const count = topic.topicCards?.length ?? 0;

          return (
            <Link
              className={styles.topicCard}
              href={ROUTES.topics.detail(topic.id)}
              key={topic.id}
            >
              <div className={styles.topicMeta}>
                <span className={styles.topicName}>{topic.name}</span>
                {count > 0 && (
                  <span className={styles.topicCount}>
                    {count} {count === 1 ? 'card' : 'cards'}
                  </span>
                )}
              </div>
              {topic.description && (
                <p className={styles.topicDescription}>{topic.description}</p>
              )}
            </Link>
          );
        })}
      </div>
    )}
  </main>
);

export default TopicsList;
