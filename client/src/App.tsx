import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Button from '@/lib/design/Button';
function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Button variant="default" size="small">
          버튼
        </Button>
        <p>Hello World</p>
      </div>
    </>
  );
}

export default App;
