import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import theme from '../src/styles/theme';
import GlobalStyle from '../src/styles/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProvider>
));
