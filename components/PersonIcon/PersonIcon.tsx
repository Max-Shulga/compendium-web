import type { TPersonIcon } from './models/personIcon.model';

const PersonIcon = ({ size = '16' }: TPersonIcon) => (
  <svg
    fill='none'
    height={size}
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    width={size}
  >
    <circle cx='12' cy='8' r='4' />
    <path d='M4 21c1.6-3.6 4.8-5.5 8-5.5s6.4 1.9 8 5.5' />
  </svg>
);

export default PersonIcon;
