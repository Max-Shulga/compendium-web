'use client';

import { useState } from 'react';

import styles from './InterviewCardCarousel.module.css';
import type { TInterviewCardCarousel } from './models/interview-card-carousel.model';

const InterviewCardCarousel = ({ cards }: TInterviewCardCarousel) => {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card = cards[index];
  const isFirst = index === 0;
  const isLast = index === cards.length - 1;

  const handlePrev = () => {
    if (isFirst) return;
    setIndex((prev) => prev - 1);
    setRevealed(false);
  };

  const handleNext = () => {
    if (isLast) return;
    setIndex((prev) => prev + 1);
    setRevealed(false);
  };

  const handleToggleReveal = () => setRevealed((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <p className={styles.progress}>
        Card {index + 1} of {cards.length}
      </p>

      <div className={styles.stage}>
        <button
          aria-label='Previous card'
          className={styles.navButton}
          disabled={isFirst}
          type='button'
          onClick={handlePrev}
        >
          <svg className={styles.navIcon} fill='none' height='16' viewBox='0 0 24 24' width='16'>
            <polyline
              points='15 6 9 12 15 18'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
          </svg>
        </button>

        <div className={styles.deck}>
          <div aria-hidden='true' className={styles.ghostFar} />
          <div aria-hidden='true' className={styles.ghostNear} />
          <button
            aria-expanded={revealed}
            className={`${styles.card} ${revealed ? styles.cardRevealed : ''}`}
            type='button'
            onClick={handleToggleReveal}
          >
            <span aria-hidden={revealed} className={`${styles.face} ${styles.faceFront}`}>
              <span className={styles.question}>{card.title}</span>
              <span className={styles.hint}>Tap to reveal the answer</span>
            </span>
            <span aria-hidden={!revealed} className={`${styles.face} ${styles.faceBack}`}>
              <span className={styles.answerLabel}>Answer</span>
              <span className={styles.answer}>{card.text}</span>
              <span className={styles.hint}>Tap to hide</span>
            </span>
          </button>
        </div>

        <button
          aria-label='Next card'
          className={styles.navButton}
          disabled={isLast}
          type='button'
          onClick={handleNext}
        >
          <svg className={styles.navIcon} fill='none' height='16' viewBox='0 0 24 24' width='16'>
            <polyline
              points='9 6 15 12 9 18'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InterviewCardCarousel;
