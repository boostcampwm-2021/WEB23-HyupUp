/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicDispatch, useEpicState, useStoryState } from '@/lib/hooks/useContextHooks';
import { addDate } from '@/lib/utils/date';
import { getEpicById, updateEpicById } from '@/lib/api/epic';
import { makeEpicRenderInfo } from '@/lib/utils/epic';
import { useSocketReceive, useSocketSend } from '@/lib/hooks';

const COLUMNS = 15;

interface RoadmapBarsProps {
  rangeFrom: Date;
  rangeTo: Date;
  dayRow: number[];
  isToday: boolean;
}

const RoadmapBars = ({ rangeFrom, rangeTo, dayRow, isToday }: RoadmapBarsProps) => {
  const epics = useEpicState();
  const stories = useStoryState();
  const [currentDrag, setCurrentDrag] = useState({ targetId: -1, isDraggingLeft: false });
  const epicRenderInfo = makeEpicRenderInfo(epics, stories, {
    rangeFrom,
    rangeTo,
    columns: COLUMNS,
  });

  const dispatchEpic = useEpicDispatch();
  const emitUpdateEpicBar = useSocketSend('UPDATE_EPIC_BAR');
  useSocketReceive('UPDATE_EPIC_BAR', async (updatedEpicId: number) => {
    const updatedEpic = await getEpicById(updatedEpicId);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic!,
    });
  });

  const getCurrentDragInfo = (e: React.DragEvent) => {
    const nowDraggingEpic = epics.find((epic) => epic.id === currentDrag.targetId)!; // 현재 드래그 중인 에픽 객체
    const currentItem = epicRenderInfo.find((epic) => epic.id === currentDrag.targetId)!; // 현재 드래그 중인 에픽의 렌더링 정보 객체
    const currentIndex = currentItem.index + currentItem.length; // 현재 드래그 중인 에픽의 오른쪽 핸들이 몇번째 column에 위치하는지
    const intersectingIndex = +(e.target as HTMLElement).dataset.index!; // 드래그 중일 때 마우스 커서가 몇번째 column에 위치하는지

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
      intersectingIndex - (currentDrag.isDraggingLeft ? currentItem.index : currentIndex);
    const shouldUpdate =
      (currentDrag.isDraggingLeft && intersectingIndex <= currentIndex) ||
      (!currentDrag.isDraggingLeft && currentItem.index <= intersectingIndex);
    if (!shouldUpdate) return;

    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: {
        id: currentDrag.targetId,
        projectId: nowDraggingEpic.projectId,
        name: nowDraggingEpic.name,
        startAt: currentDrag.isDraggingLeft
          ? addDate(nowDraggingEpic.startAt, offset)
          : nowDraggingEpic.startAt,
        endAt: currentDrag.isDraggingLeft
          ? nowDraggingEpic.endAt
          : addDate(nowDraggingEpic.endAt, offset),
        order: nowDraggingEpic.order,
      },
    });
  };

  const handleDrop = async (e: React.DragEvent) => {
    const { nowDraggingEpic } = getCurrentDragInfo(e);
    await updateEpicById(currentDrag.targetId, nowDraggingEpic);
    emitUpdateEpicBar(currentDrag.targetId);
  };

  return (
    <>
      <S.Container>
        {epicRenderInfo.map(({ id, length, exceedsLeft, exceedsRight, index, status }) => {
          return (
            <RoadmapItem
              key={id}
              status={status}
              columns={COLUMNS}
              index={index}
              length={length}
              exceedsLeft={exceedsLeft}
              exceedsRight={exceedsRight}
              handleDragStart={() => {
                setCurrentDrag({
                  targetId: id,
                  isDraggingLeft: false,
                });
              }}
              handleDragStartLeft={() => {
                setCurrentDrag({
                  targetId: id,
                  isDraggingLeft: true,
                });
              }}
            />
          );
        })}
      </S.Container>

      {/* <S.DayColumnWrapper>
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
      </S.DayColumnWrapper> */}
    </>
  );
};

export default RoadmapBars;
