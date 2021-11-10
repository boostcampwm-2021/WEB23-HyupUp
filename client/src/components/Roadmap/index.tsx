import * as React from 'react';
import Button from '@/lib/design/Button';
import S from './style';
import { useEpicState } from '@/lib/hooks/useContextHooks';

const Roadmap = () => {
  const epics = useEpicState();
  // TODO: 현재 프로젝트 이름을 context에서 받아오도록 수정
  const epicsOnProject = epics['HyupUp'];

  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.EpicEntry>
          {epicsOnProject?.map(({ name }, i) => (
            <S.EpicEntryItem key={name + i.toString()}>{name}</S.EpicEntryItem>
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
