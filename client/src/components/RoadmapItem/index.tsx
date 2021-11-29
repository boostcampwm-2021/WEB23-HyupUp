import React, { useEffect, useState } from 'react';
import { RoadmapBarsStatus } from '@/types/epic';
import S from './style';

interface RoadmapItemProps {
  columns: number;
  index: number;
  length: number;
  exceedsLeft: boolean;
  exceedsRight: boolean;
  status: RoadmapBarsStatus;
  handleDragStart: () => void;
  handleDragStartLeft: () => void;
}

const RoadmapItem = ({
  columns,
  index,
  length,
  exceedsLeft,
  exceedsRight,
  status,
  handleDragStart,
  handleDragStartLeft,
}: RoadmapItemProps) => {
  const [leftEnd, setLeftEnd] = useState(index);
  const [rightEnd, setRightEnd] = useState(index + length);
  const [isDragFront, setIsDragFront] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLeftEnd(index);
    setRightEnd(index + length);
  }, [index, length]);

  const handleDragEnter = (e: React.DragEvent) => {
    if (!isDragging) return;
    const newIndex = +(e.target as HTMLElement).dataset.index!;
    if (isDragFront && newIndex <= rightEnd) setLeftEnd(newIndex);
    else if (!isDragFront && newIndex >= leftEnd) setRightEnd(newIndex);
  };

  return (
    <S.Container columns={columns}>
      {[...Array(columns)].map((_, i) => {
        if (i === leftEnd) {
          return (
            <S.Bar key={i} data-index={i} status={status} onDragEnter={handleDragEnter}>
              {!exceedsLeft && (
                <S.FrontHandle
                  draggable="true"
                  onDragStart={() => {
                    handleDragStartLeft();
                    setIsDragFront(true);
                    setIsDragging(true);
                  }}
                  status={status}
                />
              )}
              {rightEnd - leftEnd === 0 && !exceedsRight && (
                <S.RearHandle
                  draggable="true"
                  onDragStart={() => {
                    handleDragStart();
                    setIsDragFront(false);
                    setIsDragging(true);
                  }}
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
                  onDragStart={() => {
                    handleDragStart();
                    setIsDragFront(false);
                    setIsDragging(true);
                  }}
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
