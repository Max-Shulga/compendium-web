import { createTheme } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'var(--font-inter), sans-serif',
  fontFamilyMonospace: 'ui-monospace, monospace',
  headings: {
    fontFamily: 'var(--font-lora), Georgia, serif',
    fontWeight: '400'
  },
  primaryColor: 'violet',
  primaryShade: { light: 8, dark: 5 },
  cursorType: 'pointer',
  defaultRadius: 'xs',
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
