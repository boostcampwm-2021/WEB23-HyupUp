import * as React from 'react';
import styled from 'styled-components';

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

const S = {
  Container: styled.div`
    display: flex;
    align-items: center;
  `,
  Icon: styled.div<{ highlight: boolean }>`
    & img {
      filter: ${({ highlight }) =>
        highlight
          ? 'invert(33%) sepia(26%) saturate(3652%) hue-rotate(196deg) brightness(99%) contrast(85%);'
          : ''};
    }
  `,
  Label: styled.span<{ highlight: boolean }>`
    margin-left: 8px;

    font: ${({ theme }) => theme.font.body_regular};
    color: ${({ highlight, theme }) => (highlight ? theme.color.blue400 : theme.color.gray300)};
  `,
};
