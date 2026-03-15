import type { Preview } from '@storybook/html';
import { defineCustomElements } from '@cc-design-system/components/loader';
import '@cc-design-system/tokens/css';

// Register all cc- custom elements
defineCustomElements();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    backgrounds: {
      disable: true, // we use the theme global instead
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals['theme'] ?? 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.style.backgroundColor = theme === 'dark' ? '#0f0f0f' : '#ffffff';
      return Story();
    },
  ],
};

export default preview;
