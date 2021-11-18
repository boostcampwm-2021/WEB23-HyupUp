import * as React from 'react';
import S from '@/layers/SideBar/style';
import SideBarDropDown from '@/components/SideBarDropdown';

interface SideBarProps {
  entries: React.ReactNode[];
  needDropDown: boolean;
  changeTab: (tabIndex: number) => void;
}

/**
 *
 * @param entries 사이드바에 항목으로 들어갈 리액트 컴포넌트들의 배열
 * @param changeTab 현재 보고있는 화면을 로드맵, 칸반보드, 백로그 페이지에서 바꿔줄 함수
 * @returns
 */
const SideBar = ({ entries, changeTab, needDropDown }: SideBarProps) => {
  return (
    <S.Container>
      {needDropDown ? <SideBarDropDown /> : undefined}
      <S.Entry>
        {entries.map((entry, i) => (
          <S.EntryItem key={i} onClick={() => changeTab(i)}>
            {entry}
          </S.EntryItem>
        ))}
      </S.Entry>
    </S.Container>
  );
};

export default SideBar;
