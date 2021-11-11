import React from 'react';
import { EpicProvider } from './epicContext';
import { StoryProvider } from './storyContext';
import { UserProvider } from './userContext';
import SocketConnector from './socketContext';

export default function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <EpicProvider>
        <SocketConnector>
          <StoryProvider>{children}</StoryProvider>
        </SocketConnector>
      </EpicProvider>
    </UserProvider>
  );
}
