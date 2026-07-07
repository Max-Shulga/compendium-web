const Forbidden = () => (
  <main style={{ display: 'flex',flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '0.5rem' }}>
    <h1 style={{ fontSize: '4rem', fontWeight: 400, margin: 0 }}>403</h1>
    <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
      You don&apos;t have permission to view this page.</p>
  </main>
);

export default Forbidden;
