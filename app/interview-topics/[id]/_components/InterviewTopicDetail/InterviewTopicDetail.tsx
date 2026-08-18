'use client';

import { SegmentedControl, Title } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';

import InterviewCardPreview
  from '@/app/interview-topics/_components/InterviewCardPreview/InterviewCardPreview';
import { ROUTES } from '@/core/constants/routes.constant';

import InterviewCardCarousel from '../InterviewCardCarousel/InterviewCardCarousel';

import { VIEW_MODES } from './_constants/viewMode.constant';
import styles from './InterviewTopicDetail.module.css';
import type { TInterviewTopicDetail, TViewMode } from './models/interview-topic-detail.model';

const InterviewTopicDetail = ({ topic }: TInterviewTopicDetail) => {
  const [viewMode, setViewMode] = useState<TViewMode>(VIEW_MODES.list);
  const cards = topic.cards ?? [];

  const handleViewModeChange = (value: string) => setViewMode(value as TViewMode);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <Link className={styles.backLink} href={ROUTES.interviewTopics.list}>
          ← Interview
        </Link>
      </nav>

      <Title order={1} style={{ fontWeight: 400 }}>{topic.title}</Title>
      {viewMode !== VIEW_MODES.carousel && topic.description && (
        <p className={styles.description}>{topic.description}</p>
      )}

      {cards.length > 0 && (
        <section className={styles.cardsSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderInfo}>
              <span className={styles.sectionLabel}>Cards</span>
              <span className={styles.cardCount}>{cards.length}</span>
            </div>
            <SegmentedControl
              classNames={{
                root: styles.viewToggleRoot,
                indicator: styles.viewToggleIndicator,
                label: styles.viewToggleLabel
              }}
              data={[
                { label: 'List', value: VIEW_MODES.list },
                { label: 'One by one', value: VIEW_MODES.carousel }
              ]}
              size='xs'
              value={viewMode}
              onChange={handleViewModeChange}
            />
          </div>
          {viewMode === VIEW_MODES.carousel ? (
            <InterviewCardCarousel cards={cards} />
          ) : (
            <div className={styles.cardList}>
              {cards.map((card) => (
                <InterviewCardPreview card={card} key={card.id} />
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default InterviewTopicDetail;
