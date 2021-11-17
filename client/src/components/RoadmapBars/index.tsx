import React from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicState } from '@/lib/hooks/useContextHooks';

const RoadmapBars = () => {
  const epics = useEpicState();

  return (
    <S.Container>
      {epics.map((epic) => (
        <RoadmapItem key={epic.id} />
      ))}
    </S.Container>
  );
};

export default RoadmapBars;
