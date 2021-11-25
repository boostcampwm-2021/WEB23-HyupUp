import React from 'react';
import { RoadmapBarsStatus } from '@/types/epic';
import S from './style';

interface RoadmapItemProps {
  columns: number;
  index: number;
  length: number;
  exceedsLeft: boolean;
  exceedsRight: boolean;
  status: RoadmapBarsStatus;
  handleDragStart: () => void;
  handleDragStartLeft: () => void;
}

const RoadmapItem = ({
  columns,
  index,
  length,
  exceedsLeft,
  exceedsRight,
  status,
  handleDragStart,
  handleDragStartLeft,
}: RoadmapItemProps) => {
  return (
    <S.Container columns={columns}>
      {[...Array(columns)].map((_, i) => {
        if (i === index)
          return (
            <S.Bar key={i} status={status}>
              {!exceedsLeft && (
                <S.FrontHandle draggable="true" onDragStart={handleDragStartLeft} status={status} />
              )}
              {length === 0 && !exceedsRight && (
                <S.RearHandle draggable="true" onDragStart={handleDragStart} status={status} />
              )}
            </S.Bar>
          );
        else if (i === index + length)
          return (
            <S.Bar key={i} status={status}>
              {!exceedsRight && (
                <S.RearHandle draggable="true" onDragStart={handleDragStart} status={status} />
              )}
            </S.Bar>
          );
        else if (i < index + length && i > index) return <S.Bar key={i} status={status} />;
        else return <S.Spacer key={i} />;
      })}
    </S.Container>
  );
};

export default RoadmapItem;
