import { Title } from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@/core/constants/routes.constant';

import styles from './InterviewTopicsList.module.css';
import type { TInterviewTopicsList } from './models/interview-topics-list.model';

const InterviewTopicsList = ({ topics }: TInterviewTopicsList) => (
  <main className={styles.page}>
    <div className={styles.header}>
      <Title order={1} style={{ fontWeight: 400 }}>Interview</Title>
    </div>
    {topics.length === 0 ? (
      <div className={styles.empty}>
        <p>No interview topics yet.</p>
      </div>
    ) : (
      <div className={styles.list}>
        {topics.map((topic) => {
          const count = topic.cards?.length ?? 0;

          return (
            <Link
              className={styles.topicCard}
              href={ROUTES.interviewTopics.detail(topic.id)}
              key={topic.id}
            >
              <div className={styles.topicMeta}>
                <span className={styles.topicName}>{topic.title}</span>
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

export default InterviewTopicsList;
