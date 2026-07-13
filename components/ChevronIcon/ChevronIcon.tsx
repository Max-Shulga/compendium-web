import styles from './ChevronIcon.module.css';

type Props = { expanded: boolean };

const ChevronIcon = ({ expanded }: Props) => (
  <svg
    className={`${styles.icon} ${expanded ? styles.expanded : ''}`}
    fill='none'
    height='12'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width='12'
  >
    <polyline points='9 6 15 12 9 18' />
  </svg>
);

export default ChevronIcon;
