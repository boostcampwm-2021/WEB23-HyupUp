import React from 'react';
import S from './style';

interface RoadmapItemProps {
  from: Date;
  to: Date;
  columns: number;
  index: number;
}

const RoadmapItem = ({ from, to, columns, index }: RoadmapItemProps) => {
  return (
    <S.Container columns={columns}>
      {[...Array(columns)].map((_, i) =>
        i === index ? (
          <S.Bar key={i}>
            <S.FrontHandle />
            <S.RearHandle />
          </S.Bar>
        ) : (
          <S.Spacer key={i}></S.Spacer>
        ),
      )}
    </S.Container>
  );
};

export default RoadmapItem;
