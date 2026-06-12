import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#5b44c9',
        borderRadius: 4,
        paddingLeft: 7
      }}
    >
      <div style={{ background: 'white', borderRadius: 1, display: 'flex',
        height: 4, marginBottom: 2, width: 8 }} />
      <div style={{ background: 'white', borderRadius: 1, display: 'flex',
        height: 4, marginBottom: 2, width: 13 }} />
      <div style={{ background: 'white', borderRadius: 1, display: 'flex',
        height: 4, width: 18 }} />
    </div>,
    { ...size }
  );
}
