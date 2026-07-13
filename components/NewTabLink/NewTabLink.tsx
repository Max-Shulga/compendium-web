'use client';

import type { MouseEvent } from 'react';

import ExternalLinkIcon from '@/components/ExternalLinkIcon';

import type { TNewTabLink } from './models/newTabLink.model';
import styles from './NewTabLink.module.css';

const NewTabLink = ({ href }: TNewTabLink) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      aria-label='Open in new tab'
      className={styles.button}
      type='button'
      onClick={handleClick}
    >
      <ExternalLinkIcon />
    </button>
  );
};

export default NewTabLink;
