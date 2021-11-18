import React from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicState } from '@/lib/hooks/useContextHooks';
import { getDateDiff, isFormer, isLatter, shouldRender } from '@/lib/utils/date';

const COLUMNS = 15;

interface RoadmapBarsProps {
  rangeFrom: Date;
  rangeTo: Date;
}

// rangeFrom은 현재 캘린더뷰의 시작일자, rangeTo는 끝 일자
// startAt은 에픽 항목의 시작일자, endAt은 에픽 항목의 끝 일자
//
// 에픽 막대를 렌더링해야하는 케이스 (<--> : 캘린더뷰, |--|: 에픽 항목)
// 1: startAt이 rangeFrom 앞, endAt이 rangeFrom 뒤 (왼쪽에 걸쳐있는 경우)
//    <------>
// |----|
//
// 2: startAt이 rangeTo 앞, endAt이 rangeTo 뒤 (오른쪽에 걸쳐있는 경우)
// <------>
//      |-----|
//
// 3: startAt이 rangeFrom 뒤, endAt이 rangeTo 앞 (완전히 포함되는 경우)
// <------>
//   |--|
//
// 4: startAt이 rangeFrom 앞, endAt이 rangeTo 뒤 (완전히 포함하는 경우)
//    <------>
// |-----------|
//
// 그 외의 경우는 캘린더 뷰에 렌더링하지 않아야함
const RoadmapBars = ({ rangeFrom, rangeTo }: RoadmapBarsProps) => {
  const epics = useEpicState();

  return (
    <S.Container>
      {epics.map(({ id, startAt, endAt }) => {
        const case1 = isFormer(startAt, rangeFrom) && isLatter(endAt, rangeFrom);
        const case2 = isFormer(startAt, rangeTo) && isLatter(endAt, rangeTo);
        const case3 = isLatter(startAt, rangeFrom) && isFormer(endAt, rangeTo);
        const case4 = isFormer(startAt, rangeFrom) && isLatter(endAt, rangeTo);

        const render = shouldRender({
          start: startAt,
          end: endAt,
          from: rangeFrom,
          to: rangeTo,
        });
        let startIndex = COLUMNS;
        if (case1 || case4) startIndex = 0;
        else if (render) startIndex = Math.min(getDateDiff(rangeFrom, startAt), COLUMNS);

        let length = 0;
        if (case1) length = getDateDiff(rangeFrom, endAt);
        else if (case2) length = getDateDiff(startAt, rangeTo);
        else if (case3) length = getDateDiff(startAt, endAt);
        else if (case4) length = getDateDiff(rangeFrom, rangeTo);

        return <RoadmapItem key={id} columns={COLUMNS} index={startIndex} length={length} />;
      })}
    </S.Container>
  );
};

export default RoadmapBars;
