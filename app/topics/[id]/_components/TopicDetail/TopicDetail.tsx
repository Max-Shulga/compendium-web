import { Title } from '@mantine/core';
import Link from 'next/link';

import { ROUTES } from '@/core/constants/routes.constant';

import type { TTopicDetail } from './models/topic-detail.model';
import styles from './TopicDetail.module.css';

const TopicDetail = ({ topic }: TTopicDetail) => {
  const cards = topic.topicCards?.slice()
    .sort((firstCard, secondCard) => firstCard.order - secondCard.order) ?? [];

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link className={styles.backLink} href={ROUTES.topics.list}>
          ← Topics
        </Link>
        <Link className={styles.editLink} href={ROUTES.topics.edit(topic.id)}>
          Edit
        </Link>
      </nav>

      <Title order={1} style={{ fontWeight: 400 }}>{topic.name}</Title>
      {topic.description && (
        <p className={styles.description}>{topic.description}</p>
      )}

      {cards.length > 0 && (
        <section className={styles.cardsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Cards</span>
            <span className={styles.cardCount}>{cards.length}</span>
          </div>
          <div className={styles.cardList}>
            {cards.map((topicCard) => (
              <div className={styles.cardItem} key={topicCard.id}>
                <p className={styles.cardTitle}>{topicCard.card.title}</p>
                {topicCard.card.text && (
                  <p className={styles.cardPreview}>{topicCard.card.text}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default TopicDetail;
