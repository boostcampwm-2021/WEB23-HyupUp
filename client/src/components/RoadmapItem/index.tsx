import React, { useEffect, useState } from 'react';
import { RoadmapBarsStatus } from '@/types/epic';
import S from './style';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { addDate } from '@/lib/utils/date';
import { getEpicById, updateEpicById } from '@/lib/api/epic';
import { useSocketReceive, useSocketSend } from '@/lib/hooks';

interface RoadmapItemProps {
  id: number;
  columns: number;
  index: number;
  length: number;
  exceedsLeft: boolean;
  exceedsRight: boolean;
  status: RoadmapBarsStatus;
}

const RoadmapItem = ({
  id,
  columns,
  index,
  length,
  exceedsLeft,
  exceedsRight,
  status,
}: RoadmapItemProps) => {
  const [leftEnd, setLeftEnd] = useState(index);
  const [rightEnd, setRightEnd] = useState(index + length);
  const [isDragFront, setIsDragFront] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [initialIndex, setinItialIndex] = useState({ left: index, right: index + length });

  const dispatchEpic = useEpicDispatch();
  const epics = useEpicState();
  const emitUpdateEpicBar = useSocketSend('UPDATE_EPIC_BAR');
  useSocketReceive('UPDATE_EPIC_BAR', async (epicId: number) => {
    const updatedEpic = await getEpicById(epicId);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic!,
    });
  });

  useEffect(() => {
    setLeftEnd(index);
    setRightEnd(index + length);
  }, [index, length]);

  const startDragging = (isFront: boolean) => {
    setIsDragFront(isFront);
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (!isDragging) return;
    const newIndex = +(e.target as HTMLElement).dataset.index!;
    if (isDragFront && newIndex <= rightEnd) setLeftEnd(newIndex);
    else if (!isDragFront && newIndex >= leftEnd) setRightEnd(newIndex);
  };

  const handleDrop = async () => {
    const offset = isDragFront ? initialIndex.left - leftEnd : rightEnd - initialIndex.right;
    setinItialIndex({ left: leftEnd, right: rightEnd });
    const nowDraggingEpic = epics.find((epic) => epic.id === id)!;
    const updatedEpic = {
      ...nowDraggingEpic,
      startAt: isDragFront
        ? addDate(nowDraggingEpic.startAt, offset * -1)
        : nowDraggingEpic.startAt,
      endAt: isDragFront ? nowDraggingEpic.endAt : addDate(nowDraggingEpic.endAt, offset),
    };

    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
    await updateEpicById(id, updatedEpic);
    emitUpdateEpicBar(id);
  };

  return (
    <S.Container columns={columns} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {[...Array(columns)].map((_, i) => {
        if (i === leftEnd) {
          return (
            <S.Bar key={i} data-index={i} status={status} onDragEnter={handleDragEnter}>
              {!exceedsLeft && (
                <S.FrontHandle
                  draggable="true"
                  onDragStart={() => startDragging(true)}
                  status={status}
                />
              )}
              {rightEnd - leftEnd === 0 && !exceedsRight && (
                <S.RearHandle
                  draggable="true"
                  onDragStart={() => startDragging(false)}
                  status={status}
                />
              )}
            </S.Bar>
          );
        } else if (i === rightEnd) {
          return (
            <S.Bar key={i} data-index={i} status={status} onDragEnter={handleDragEnter}>
              {!exceedsRight && (
                <S.RearHandle
                  draggable="true"
                  onDragStart={() => startDragging(false)}
                  status={status}
                />
              )}
            </S.Bar>
          );
        } else if (i < rightEnd && i > leftEnd) {
          return <S.Bar data-index={i} key={i} status={status} onDragEnter={handleDragEnter} />;
        } else {
          return <S.Spacer data-index={i} key={i} onDragEnter={handleDragEnter}></S.Spacer>;
        }
      })}
    </S.Container>
  );
};

export default RoadmapItem;
