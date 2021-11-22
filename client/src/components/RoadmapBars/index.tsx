/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import {
  addDate,
  getDateDiff,
  isFormer,
  isLatter,
  isSameDay,
  shouldRender,
} from '@/lib/utils/date';
import { toast } from 'react-toastify';

const COLUMNS = 15;

interface RoadmapBarsProps {
  rangeFrom: Date;
  rangeTo: Date;
  dayRow: number[];
  isToday: boolean;
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
const RoadmapBars = ({ rangeFrom, rangeTo, dayRow, isToday }: RoadmapBarsProps) => {
  const epics = useEpicState();
  const dispatchEpic = useEpicDispatch();
  const [nowDraggingId, setDraggingId] = useState(-1);
  const [isDraggingLeft, setDraggingLeft] = useState(false);
  const epicRenderInfo = epics.map(({ id, startAt, endAt }) => {
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
    if (isSameDay(endAt, rangeFrom)) startIndex = 0;
    else if (isSameDay(startAt, rangeTo)) startIndex = COLUMNS - 1;
    else if (case1 || case4) startIndex = 0;
    else if (render) startIndex = Math.min(getDateDiff(rangeFrom, startAt), COLUMNS);

    let length = 0;
    if (case1) length = getDateDiff(rangeFrom, endAt);
    else if (case2) length = getDateDiff(startAt, rangeTo);
    else if (case3) length = getDateDiff(startAt, endAt);
    else if (case4) length = getDateDiff(rangeFrom, rangeTo);

    const exceedsLeft = isSameDay(startAt, rangeFrom) || isFormer(startAt, rangeFrom);
    const exceedsRight = isSameDay(endAt, rangeTo) || isLatter(endAt, rangeTo);
    return {
      index: startIndex,
      id,
      length,
      exceedsLeft,
      exceedsRight,
    };
  });

  return (
    <>
      <S.Container>
        {epicRenderInfo.map(({ id, length, exceedsLeft, exceedsRight, index }) => (
          <RoadmapItem
            key={id}
            columns={COLUMNS}
            index={index}
            length={length}
            exceedsLeft={exceedsLeft}
            exceedsRight={exceedsRight}
            handleDragStart={() => {
              setDraggingId(id);
              setDraggingLeft(false);
            }}
            handleDragStartLeft={() => {
              setDraggingId(id);
              setDraggingLeft(true);
            }}
          />
        ))}
      </S.Container>
      <S.DayColumnWrapper>
        {dayRow.map((day: number, i) => (
          <S.DayColumn
            key={day}
            highlightColumn={Math.floor((COLUMNS - 1) / 2 + 1)}
            isToday={isToday}
            data-index={i}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => {
              const nowDraggingEpic = epics.find((epic) => epic.id === nowDraggingId)!; // 현재 드래그 중인 에픽 객체
              const currentItem = epicRenderInfo.find((epic) => epic.id === nowDraggingEpic.id)!; // 현재 드래그 중인 에픽의 렌더링 정보 객체
              const currentIndex = currentItem.index + currentItem.length; // 현재 드래그 중인 에픽의 오른쪽 핸들이 몇번째 column에 위치하는지
              const intersectingIndex = (e.target as HTMLElement).dataset.index!; // 드래그 중일 때 마우스 커서가 몇번째 column에 위치하는지

              let offset = 0;
              if (!isDraggingLeft) {
                offset = parseInt(intersectingIndex) - currentIndex; // 드래그 중인 에픽의 오른쪽 핸들과 드래그 중인 마우스 커서의 column 인덱스 차이
                dispatchEpic({
                  type: 'UPDATE_EPIC',
                  epic: {
                    id: nowDraggingId,
                    name: nowDraggingEpic.name,
                    startAt: nowDraggingEpic.startAt,
                    endAt: addDate(nowDraggingEpic.endAt, offset),
                  },
                });
              } else {
                offset = parseInt(intersectingIndex) - currentItem.index;
                dispatchEpic({
                  type: 'UPDATE_EPIC',
                  epic: {
                    id: nowDraggingId,
                    name: nowDraggingEpic.name,
                    startAt: addDate(nowDraggingEpic.startAt, offset),
                    endAt: nowDraggingEpic.endAt,
                  },
                });
              }
            }}
            onDrop={() => toast.success(`id ${nowDraggingId} dropped!!`)}
          />
        ))}
      </S.DayColumnWrapper>
    </>
  );
};

export default RoadmapBars;
