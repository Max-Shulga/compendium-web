import type { MouseEvent } from 'react';

const isPlainClick = (event: MouseEvent) =>
  event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey;

export default isPlainClick;
