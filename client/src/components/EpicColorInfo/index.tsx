import React, { useState } from 'react';
import S from './style';
import infoIcon from '@public/icons/info.svg';

const EpicColorInfo = () => {
  const [showInfo, setShowInfo] = useState(false);
  const handleOver = () => {
    setShowInfo(true);
  };
  const handleOut = () => {
    setShowInfo(false);
  };

  return (
    <S.Container onMouseOver={handleOver} onMouseOut={handleOut}>
      <img src={infoIcon} alt="info icon" />
      <S.TooltipContainer hidden={showInfo}>
        <p>
          <S.Line>
            <S.Emphasize status={'UNINITIALIZED'}>회색</S.Emphasize> 막대는 연동된 스토리가 없는
            에픽입니다.
          </S.Line>
          <S.Line>
            <S.Emphasize status={'NOT_STARTED'}>빨간색</S.Emphasize> 막대는 연동된 스토리들이 모두
            진행중이 아닌 에픽입니다.
          </S.Line>
          <S.Line>
            <S.Emphasize status={'STARTED'}>초록색</S.Emphasize> 막대는 연동된 스토리들이 하나라도
            진행중인 에픽입니다.
          </S.Line>
          <S.Line>
            <S.Emphasize status={'ALL_DONE'}>파란색</S.Emphasize> 막대는 연동된 스토리들이 모두
            완료된 에픽입니다.
          </S.Line>
        </p>
      </S.TooltipContainer>
    </S.Container>
  );
};
export default EpicColorInfo;
