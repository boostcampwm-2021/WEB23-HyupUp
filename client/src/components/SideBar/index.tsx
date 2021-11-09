import * as React from 'react';
import styled from 'styled-components';

import Dropdown from '@/lib/design/DropDown';

interface SideBarProps {
  entries: React.ReactNode[];
  changeTab: (tabIndex: number) => void;
  highlight?: number;
}

/**
 *
 * @param entries 사이드바에 항목으로 들어갈 리액트 컴포넌트들의 배열
 * @param changeTab 현재 보고있는 화면을 로드맵, 칸반보드, 백로그 페이지에서 바꿔줄 함수
 * @param highlight? 활성화될 항목의 인덱스 번호
 * @returns
 */
const SideBar = ({ entries, changeTab, highlight }: SideBarProps) => {
  return (
    <S.Container>
      <Dropdown Title={'프로젝트 선택'} list={['1', '2', '3']} handleClick={(e) => {}}></Dropdown>
      <S.Entry>
        {entries.map((entry, i) => (
          <S.EntryItem
            key={entry?.toString()}
            highlight={i === highlight ? true : false}
            onClick={() => changeTab(i)}
          >
            {entry}
          </S.EntryItem>
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
    align-items: center;

    width: 173px;
    height: 600px;
    padding: 24px 16px;
    margin-top: 75px;

    background-color: ${({ theme }) => theme.color.gray100};
    border-radius: 8px;

    font: ${({ theme }) => theme.font.body_regular};
  `,
  Entry: styled.ul`
    margin-top: 32px;
  `,
  EntryItem: styled.li<{ highlight: boolean }>`
    padding: 12px 0;

    color: ${({ highlight, theme }) => (highlight ? theme.color.blue400 : theme.color.gray300)};
  `,
};
