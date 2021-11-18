import React from 'react';
import S from './style';

interface RoadmapItemProps {
  columns: number;
  index: number;
  length: number;
  exceedsLeft: boolean;
  exceedsRight: boolean;
}

const RoadmapItem = ({ columns, index, length, exceedsLeft, exceedsRight }: RoadmapItemProps) => {
  return (
    <S.Container columns={columns}>
      {[...Array(columns)].map((_, i) => {
        if (i === index)
          return (
            <S.Bar key={i}>
              {exceedsLeft ? undefined : <S.FrontHandle />}
              {length === 0 && !exceedsRight ? <S.RearHandle /> : undefined}
            </S.Bar>
          );
        else if (i === index + length)
          return (
            <S.Bar key={i}>
              <S.RearHandle />
            </S.Bar>
          );
        else if (i < index + length && i > index) return <S.Bar key={i} />;
        else return <S.Spacer key={i} />;
      })}
    </S.Container>
  );
};

export default RoadmapItem;
