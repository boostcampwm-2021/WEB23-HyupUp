import * as React from 'react';
import styled from 'styled-components';

interface SideBarEntryProps {
  icon: string;
  name: string;
}

const SideBarEntry = ({ icon, name }: SideBarEntryProps) => {
  return (
    <S.Container>
      <img src={icon} width={25} height={25} />
      <S.Label>{name}</S.Label>
    </S.Container>
  );
};

export default SideBarEntry;

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  Label: styled.span`
    border: 1px solid blue;

    font: ${({ theme }) => theme.font.body_regular};
  `,
};
