import React from 'react';
import { EpicProvider } from './epicContext';
import { StoryProvider } from './storyContext';
import { UserProvider } from './userContext';

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <EpicProvider>
        <StoryProvider>{children}</StoryProvider>
      </EpicProvider>
    </UserProvider>
  );
}
