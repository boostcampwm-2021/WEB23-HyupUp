import React from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';

const RoadmapBars = () => {
  return (
    <S.Container>
      <RoadmapItem></RoadmapItem>
      <RoadmapItem></RoadmapItem>
      <RoadmapItem></RoadmapItem>
      <RoadmapItem></RoadmapItem>
    </S.Container>
  );
};

export default RoadmapBars;
