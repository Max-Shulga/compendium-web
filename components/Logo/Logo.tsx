const Mark = () => (
  <svg fill='none' height='32' viewBox='0 0 32 32' width='32'>
    <rect fill='var(--color-accent)' height='32' rx='4' width='32' />
    <rect fill='white' height='4' rx='1' width='8' x='7' y='8' />
    <rect fill='white' height='4' rx='1' width='13' x='7' y='14' />
    <rect fill='white' height='4' rx='1' width='18' x='7' y='20' />
  </svg>
);

type Props = { inverted?: boolean };

const Logo = ({ inverted = false }: Props) => (
  <div style={{ alignItems: 'center', display: 'flex', gap: 'var(--mantine-spacing-sm)' }}>
    <Mark />
    <span
      style={{
        color: inverted ? '#e8e5e0' : 'var(--color-text)',
        fontFamily: 'var(--font-inter)',
        fontSize: 'var(--mantine-font-size-lg)',
        fontWeight: '600',
        letterSpacing: '-0.025em',
        lineHeight: '1'
      }}
    >
      Compendium
    </span>
  </div>
);

export default Logo;
