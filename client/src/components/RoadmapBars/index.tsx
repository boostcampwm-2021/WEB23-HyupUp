/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { addDate } from '@/lib/utils/date';
import { updateEpicById } from '@/lib/api/epic';
import { makeEpicRenderInfo } from '@/lib/utils/epic';

const COLUMNS = 15;

interface RoadmapBarsProps {
  rangeFrom: Date;
  rangeTo: Date;
  dayRow: number[];
  isToday: boolean;
}

const RoadmapBars = ({ rangeFrom, rangeTo, dayRow, isToday }: RoadmapBarsProps) => {
  const epics = useEpicState();
  const dispatchEpic = useEpicDispatch();
  const [nowDraggingId, setDraggingId] = useState(-1);
  const [isDraggingLeft, setDraggingLeft] = useState(false);
  const epicRenderInfo = makeEpicRenderInfo(epics, { rangeFrom, rangeTo, columns: COLUMNS });

  const getCurrentDragInfo = (e: React.DragEvent) => {
    const nowDraggingEpic = epics.find((epic) => epic.id === nowDraggingId)!; // 현재 드래그 중인 에픽 객체
    const currentItem = epicRenderInfo.find((epic) => epic.id === nowDraggingId)!; // 현재 드래그 중인 에픽의 렌더링 정보 객체
    const currentIndex = currentItem.index + currentItem.length; // 현재 드래그 중인 에픽의 오른쪽 핸들이 몇번째 column에 위치하는지
    const intersectingIndex = (e.target as HTMLElement).dataset.index!; // 드래그 중일 때 마우스 커서가 몇번째 column에 위치하는지

    return {
      nowDraggingEpic,
      currentItem,
      currentIndex,
      intersectingIndex,
    };
  };

  const handleDragEnter = (e: React.DragEvent) => {
    const { nowDraggingEpic, currentItem, currentIndex, intersectingIndex } = getCurrentDragInfo(e);
    const offset =
      parseInt(intersectingIndex) - (isDraggingLeft ? currentItem.index : currentIndex);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: {
        id: nowDraggingId,
        name: nowDraggingEpic.name,
        startAt: isDraggingLeft
          ? addDate(nowDraggingEpic.startAt, offset)
          : nowDraggingEpic.startAt,
        endAt: isDraggingLeft ? nowDraggingEpic.endAt : addDate(nowDraggingEpic.endAt, offset),
      },
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    const { nowDraggingEpic, currentItem, currentIndex, intersectingIndex } = getCurrentDragInfo(e);
    const offset =
      parseInt(intersectingIndex) - (isDraggingLeft ? currentItem.index : currentIndex);
    updateEpicById(nowDraggingId, {
      id: nowDraggingId,
      name: nowDraggingEpic.name,
      startAt: isDraggingLeft ? addDate(nowDraggingEpic.startAt, offset) : nowDraggingEpic.startAt,
      endAt: isDraggingLeft ? nowDraggingEpic.endAt : addDate(nowDraggingEpic.endAt, offset),
    });
  };

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
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
          />
        ))}
      </S.DayColumnWrapper>
    </>
  );
};

export default RoadmapBars;
