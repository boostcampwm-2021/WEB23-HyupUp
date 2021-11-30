import React from 'react';
import S from './style';

const COUNT = 6;

export interface BarsSpinnerProps {
  width?: number;
  height?: number;
  duration?: number;
}

const BarsSpinner = ({ width = 70, height = 70, duration }: BarsSpinnerProps) => {
  return (
    <S.Container>
      <S.BarsWrapper width={width} height={height}>
        {[...Array(COUNT)].map((_, i) => (
          <S.Line key={i} duration={duration ?? 1} width={width} count={COUNT} />
        ))}
      </S.BarsWrapper>
    </S.Container>
  );
};

export default BarsSpinner;
