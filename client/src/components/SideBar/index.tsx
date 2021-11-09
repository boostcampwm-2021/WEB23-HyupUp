import * as React from 'react';
import styled from 'styled-components';

import Dropdown from '@/lib/design/DropDown';

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
      <Dropdown Title={'프로젝트 선택'} list={['1', '2', '3']} handleClick={(e) => {}}></Dropdown>
      <S.Entry>
        {entries.map((entry, i) => (
          <S.EntryItem highlight={i === highlight ? true : false}>{entry}</S.EntryItem>
        ))}
      </S.Entry>
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
  Entry: styled.ul`
    margin-top: 64px;
  `,
  EntryItem: styled.li<{ highlight: boolean }>`
    padding: 12px 24px;

    color: ${({ theme }) => theme.color.gray400};
  `,
};
