import React, { useEffect, useState } from 'react';
import { RoadmapBarsStatus } from '@/types/epic';
import S from './style';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { addDate, getDateDiff } from '@/lib/utils/date';
import { updateEpicById } from '@/lib/api/epic';
import { useSocketSend } from '@/lib/hooks';
import { useRecoilValue } from 'recoil';
import calendarAtom from '@/recoil/calendar/atom';

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
  const [initialIndex, setInitialIndex] = useState({ left: index, right: index + length });

  const dispatchEpic = useEpicDispatch();
  const epics = useEpicState();
  const emitUpdateEpicBar = useSocketSend('UPDATE_EPIC_BAR');

  useEffect(() => {
    setLeftEnd(index);
    setRightEnd(index + length);
    setInitialIndex({ left: index, right: index + length });
  }, [index, length]);

  const startDragging = (isFront: boolean) => {
    setIsDragFront(isFront);
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    if (!isDragging) return;
    const target = e.target as HTMLElement;
    const newIndexString = target.dataset.index;
    if (!newIndexString) return;

    const newIndex = +newIndexString;
    if (isDragFront && newIndex <= rightEnd) setLeftEnd(newIndex);
    else if (!isDragFront && newIndex >= leftEnd) setRightEnd(newIndex);
  };

  const handleDrop = async (e: React.DragEvent) => {
    if (!isDragging) return;
    e.stopPropagation();
    setIsDragging(false);

    const offset = isDragFront ? leftEnd - initialIndex.left : rightEnd - initialIndex.right;
    if (offset === 0) return;

    setInitialIndex({ left: leftEnd, right: rightEnd });
    const nowDraggingEpic = epics.find((epic) => epic.id === id);
    if (!nowDraggingEpic) return;

    const updatedEpic = {
      ...nowDraggingEpic,
      startAt: addDate(nowDraggingEpic.startAt, offset * (isDragFront ? 1 : 0)),
      endAt: addDate(nowDraggingEpic.endAt, offset * (!isDragFront ? 1 : 0)),
    };

    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
    await updateEpicById(id, updatedEpic);
    emitUpdateEpicBar(id, currentProjectId);
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
