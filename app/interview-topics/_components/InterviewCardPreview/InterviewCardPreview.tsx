'use client';

import { Collapse } from '@mantine/core';
import { useState } from 'react';

import ChevronIcon from '@/components/ChevronIcon';

import styles from './InterviewCardPreview.module.css';
import type { TInterviewCardPreview } from './models/interview-card-preview.model';

const InterviewCardPreview = ({ card }: TInterviewCardPreview) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className={styles.row}>
      <button
        aria-expanded={expanded}
        className={styles.header}
        type='button'
        onClick={handleToggle}
      >
        <span className={styles.question}>{card.title}</span>
        <span className={styles.chevron}>
          <ChevronIcon expanded={expanded} />
        </span>
      </button>
      <Collapse expanded={expanded}>
        <div className={styles.panel}>
          <p className={styles.answer}>{card.text}</p>
        </div>
      </Collapse>
    </div>
  );
};

export default InterviewCardPreview;
