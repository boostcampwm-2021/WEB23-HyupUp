import React, { ComponentType, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'client/src/styles/theme';
import { StoryProvider } from 'client/src/contexts/storyContext';
import { EpicProvider } from 'client/src/contexts/epicContext';
import { render } from '@testing-library/react';

const CustomProvider = ({ children }: { children: React.FC }) => {
  return (
    <ThemeProvider theme={theme}>
      <EpicProvider>
        <StoryProvider>{children}</StoryProvider>
      </EpicProvider>
    </ThemeProvider>
  );
};

const CustomRender = (ui: ReactElement, options?: any) => {
  return render(ui, { wrapper: CustomProvider as ComponentType, ...options });
};

export default CustomRender;
