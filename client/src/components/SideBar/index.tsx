import * as React from 'react';
import styled from 'styled-components';

interface SideBarProps {
  entries: React.ReactNode[];
  highlight?: number;
}

/**
 *
 * @param entries 사이드바에 항목으로 들어갈 리액트 컴포넌트
 * @param highlight? 활성화될 항목의 인덱스 번호
 * @returns
 */
const SideBar = ({ entries, highlight }: SideBarProps) => {
  return (
    <S.Container>
      <ul>
        {entries.map((entry) => (
          <S.Entry>{entry}</S.Entry>
        ))}
      </ul>
    </S.Container>
  );
};

export default SideBar;

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;

    width: 173px;
    height: 600px;
    margin-top: 75px;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;

    font: ${({ theme }) => theme.font.body_regular};
  `,
  Entry: styled.li`
    padding: 16px 24px;
    border: 1px solid red;

    color: ${({ theme }) => theme.color.white};
  `,
};
