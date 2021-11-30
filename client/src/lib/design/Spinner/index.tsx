import React from 'react';
import Styled from '@/lib/design/Spinner/style';

export type SpinnerProps = {
  widthLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  heightValue?: number;
  colorValue?: 'gray' | 'white' | 'blue' | 'red';
  radiusValue?: number;
};

const Spinner = ({
  widthLevel = 10,
  heightValue = 800,
  colorValue = 'gray',
  radiusValue = 30,
}: SpinnerProps) => {
  return (
    <Styled.SpinnerWrapper
      widthLevel={widthLevel}
      heightValue={heightValue}
      colorValue={colorValue}
    >
      <Styled.Spinner colorValue={colorValue} radiusValue={radiusValue} />
    </Styled.SpinnerWrapper>
  );
};

export default Spinner;
