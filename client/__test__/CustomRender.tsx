import React, { ComponentType, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import theme from 'client/src/styles/theme';
import { StoryProvider } from 'client/src/contexts/storyContext';
import { EpicProvider } from 'client/src/contexts/epicContext';

const CustomProvider = ({ children }: { children: React.FC }) => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <EpicProvider>
          <StoryProvider>{children}</StoryProvider>
        </EpicProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

const CustomRender = (ui: ReactElement, options?: any) => {
  return render(ui, { wrapper: CustomProvider as ComponentType, ...options });
};

export default CustomRender;
