import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import Button from '@/lib/design/Button';
function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        <Button
          border="none"
          color="pink"
          height="200px"
          onClick={() => console.log('You clicked on the pink circle!')}
          radius="50%"
          width="200px"
        >
          {"I'm a pink circle!"}
        </Button>
        <p>Hello World</p>
      </div>
    </>
  );
}

export default App;
