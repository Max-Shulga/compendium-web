'use client';

import { Collapse } from '@mantine/core';
import Link from 'next/link';
import type { MouseEvent } from 'react';

import ChevronIcon from '@/components/ChevronIcon';
import NewTabLink from '@/components/NewTabLink';

import { VARIANT_CLASS_NAMES } from './constants/expandableRow.constant';
import styles from './ExpandableRow.module.css';
import type { TExpandableRowProps } from './models/expandable-row.model';
import isPlainClick from './utils/isPlainClick.util';

const ExpandableRow = ({
  href, variant, typeLabel, title, description, expanded, loading, children, onToggle
}: TExpandableRowProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onToggle();
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.itemRow} ${VARIANT_CLASS_NAMES[variant]}`}>
        <Link className={styles.item} href={href} onClick={handleClick}>
          <span className={styles.chevron}>
            <ChevronIcon expanded={expanded} />
          </span>
          <div className={styles.itemBody}>
            <div className={styles.itemMeta}>
              <span className={styles.itemType}>{typeLabel}</span>
              <p className={styles.itemTitle}>{title}</p>
            </div>
            {description && <p className={styles.itemPreview}>{description}</p>}
          </div>
        </Link>
        <NewTabLink href={href} />
      </div>
      <Collapse expanded={expanded}>
        <div className={styles.children}>
          {loading ? <p className={styles.loading}>Loading…</p> : children}
        </div>
      </Collapse>
    </div>
  );
};

export default ExpandableRow;
