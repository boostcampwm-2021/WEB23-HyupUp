import React from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicState } from '@/lib/hooks/useContextHooks';

const RoadmapBars = () => {
  const epics = useEpicState();

  return (
    <S.Container>
      <RoadmapItem columns={15} index={0} length={3} />
      {epics.map((epic) => (
        <RoadmapItem key={epic.id} columns={15} index={0} length={3} />
      ))}
    </S.Container>
  );
};

export default RoadmapBars;
