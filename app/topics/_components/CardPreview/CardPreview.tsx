'use client';

import { Collapse } from '@mantine/core';
import { useState } from 'react';

import ChevronIcon from '@/components/ChevronIcon';

import styles from './CardPreview.module.css';
import type { TCardPreview } from './models/card-preview.model';

const CardPreview = ({ card }: TCardPreview) => {
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
        <span className={styles.title}>{card.title}</span>
        <span className={styles.chevron}>
          <ChevronIcon expanded={expanded} />
        </span>
      </button>
      <Collapse expanded={expanded}>
        <div className={styles.panel}>
          <p className={styles.text}>{card.text}</p>
          {card.examples && (
            <>
              <p className={styles.examplesLabel}>Examples</p>
              <p className={styles.examples}>{card.examples}</p>
            </>
          )}
        </div>
      </Collapse>
    </div>
  );
};

export default CardPreview;
