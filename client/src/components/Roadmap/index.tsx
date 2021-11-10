import * as React from 'react';
import Button from '@/lib/design/Button';
import S from './style';

const Roadmap = () => {
  const list = [
    'abcdasdfasdfjasdjfoasjdfojasodfjasodjfojasdfj',
    'abcdasdfasdfjasdjfoasjdfojasodfjasodjfojasdfj',
    'abcdasdfasdfjasdjfoasjdfojasodfjasodjfojasdfj',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
    'abcdasdf',
  ];

  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.EpicEntry>
          {list.map((s, i) => (
            <S.EpicEntryItem key={s + i.toString()}>{s}</S.EpicEntryItem>
          ))}
          <Button size={'small'} category={'cancel'} onClick={() => undefined}>
            + Add item
          </Button>
        </S.EpicEntry>
        <S.RoadmapCalendar>content</S.RoadmapCalendar>
      </S.Content>
    </S.Container>
  );
};

export default Roadmap;
