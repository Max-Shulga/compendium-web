import { createTheme } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'var(--font-inter), sans-serif',
  fontFamilyMonospace: 'ui-monospace, monospace',
  headings: {
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: '600'
  },
  cursorType: 'pointer',
  defaultRadius: 'md',
  focusRing: 'auto',
  fontSmoothing: false,

  components: {
    Button: {
      defaultProps: {
        radius: 'md'
      }
    },
    Paper: {
      defaultProps: {
        radius: 'md'
      }
    },
    Card: {
      defaultProps: {
        radius: 'md'
      }
    },
    Input: {
      defaultProps: {
        radius: 'md'
      }
    }
  }
});

export default theme;
