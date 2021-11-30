import React from 'react';
import S from './style';

export interface CircleSpinnerProps {
  radius: number;
  duration?: number;
}

const CircleSpinner = ({ radius, duration }: CircleSpinnerProps) => {
  return (
    <S.Container>
      <S.Circle
        width={radius * 4}
        height={radius * 4}
        viewBox={`0 0 ${radius * 4} ${radius * 4}`}
        radius={radius}
        duration={duration ?? 0.5}
      >
        <circle cx={radius * 2} cy={radius * 2} r={radius} strokeWidth="10" />
      </S.Circle>
    </S.Container>
  );
};

export default CircleSpinner;
