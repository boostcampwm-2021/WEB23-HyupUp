import * as React from 'react';
import S from './style';

interface SideBarEntryProps {
  icon: string;
  name: string;
  highlight: boolean;
}

const SideBarEntry = ({ icon, name, highlight }: SideBarEntryProps) => {
  return (
    <S.Container>
      <S.Icon highlight={highlight}>
        <img src={icon} width={25} height={25} />
      </S.Icon>
      <S.Label highlight={highlight}>{name}</S.Label>
    </S.Container>
  );
};

export default SideBarEntry;
