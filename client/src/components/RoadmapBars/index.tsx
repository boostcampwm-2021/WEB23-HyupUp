import React from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicState } from '@/lib/hooks/useContextHooks';
import { shouldRender } from '@/lib/utils/date';

interface RoadmapBarsProps {
  rangeFrom: Date;
  rangeTo: Date;
}

// rangeFrom은 현재 캘린더뷰의 시작일자, rangeTo는 끝 일자
// startAt은 에픽 항목의 시작일자, endAt은 에픽 항목의 끝 일자
//
// 에픽 막대를 렌더링해야하는 케이스 (<--> : 캘린더뷰, |--|: 에픽 항목)
// 1: startAt이 rangeFrom 앞, endAt이 rangeTo 뒤 (왼쪽에 걸쳐있는 경우)
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
// 4: startAt이 rangeFrom 앞, endAt이 rangeTo 뒤 (완전히 밖에있는 경우)
//    <------>
// |-----------|
//
// 그 외의 경우는 캘린더 뷰에 렌더링하지 않아야함
const RoadmapBars = ({ rangeFrom, rangeTo }: RoadmapBarsProps) => {
  const epics = useEpicState();

  return (
    <S.Container>
      {epics.map((epic) => {
        const render = shouldRender({
          start: epic.startAt,
          end: epic.endAt,
          from: rangeFrom,
          to: rangeTo,
        });
        return <RoadmapItem key={epic.id} columns={15} index={0} length={render ? 3 : 0} />;
      })}
    </S.Container>
  );
};

export default RoadmapBars;
