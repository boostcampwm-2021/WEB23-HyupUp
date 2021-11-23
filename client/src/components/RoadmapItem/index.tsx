import React from 'react';
import S from './style';

interface RoadmapItemProps {
  columns: number;
  index: number;
  length: number;
  exceedsLeft: boolean;
  exceedsRight: boolean;
  handleDragStart: () => void;
  handleDragStartLeft: () => void;
}

const RoadmapItem = ({
  columns,
  index,
  length,
  exceedsLeft,
  exceedsRight,
  handleDragStart,
  handleDragStartLeft,
}: RoadmapItemProps) => {
  return (
    <S.Container columns={columns}>
      {[...Array(columns)].map((_, i) => {
        if (i === index)
          return (
            <S.Bar key={i}>
              {!exceedsLeft && <S.FrontHandle draggable="true" onDragStart={handleDragStartLeft} />}
              {length === 0 && !exceedsRight && (
                <S.RearHandle draggable="true" onDragStart={handleDragStart} />
              )}
            </S.Bar>
          );
        else if (i === index + length)
          return (
            <S.Bar key={i}>
              {!exceedsRight && <S.RearHandle draggable="true" onDragStart={handleDragStart} />}
            </S.Bar>
          );
        else if (i < index + length && i > index) return <S.Bar key={i} />;
        else return <S.Spacer key={i} />;
      })}
    </S.Container>
  );
};

export default RoadmapItem;
