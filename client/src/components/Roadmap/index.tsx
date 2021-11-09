import * as React from 'react';
import Button from '@/lib/design/Button';
import S from './style';

const Roadmap = () => {
  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.ContentEntry>
          <Button size={'small'} category={'cancel'} onClick={() => {}}>
            Add item
          </Button>
        </S.ContentEntry>
        <S.MainContent>content</S.MainContent>
      </S.Content>
    </S.Container>
  );
};

export default Roadmap;
