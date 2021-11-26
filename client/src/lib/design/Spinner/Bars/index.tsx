import React from 'react';
import S from './style';

const COUNT = 6;

export interface BarsSpinnerProps {
  duration?: number;
}

const BarsSpinner = ({ duration }: BarsSpinnerProps) => {
  return (
    <S.Container>
      <S.BarsWrapper>
        {[...Array(COUNT)].map((_, i) => (
          <S.Line key={i} duration={duration ?? 1} count={COUNT} />
        ))}
      </S.BarsWrapper>
    </S.Container>
  );
};

export default BarsSpinner;
