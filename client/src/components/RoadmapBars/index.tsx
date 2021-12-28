/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicState } from '@/lib/hooks/useContextHooks';
import { makeEpicRenderInfo } from '@/lib/utils/epic';
import storyListAtom from '@/recoil/story';
import { errorMessage } from '@/lib/common/message';

const COLUMNS = 15;

interface RoadmapBarsProps {
  rangeFrom: Date;
  rangeTo: Date;
}

const RoadmapBars = ({ rangeFrom, rangeTo }: RoadmapBarsProps) => {
  const epics = useEpicState();
  const stories = useRecoilValue(storyListAtom);
  const epicRenderInfo = makeEpicRenderInfo(epics, stories, {
    rangeFrom,
    rangeTo,
    columns: COLUMNS,
  });

  const handleDocumentDragOver = (e: DragEvent) => e.preventDefault();
  const handleDocumentDrop = () => toast.error(errorMessage.EPIC_DRAG_OUT_OF_PLACE);

  useEffect(() => {
    document.body.addEventListener('dragover', handleDocumentDragOver);
    document.body.addEventListener('drop', handleDocumentDrop);
    return () => {
      document.body.removeEventListener('dragover', handleDocumentDragOver);
      document.body.removeEventListener('drop', handleDocumentDrop);
    };
  }, []);

  return (
    <>
      <S.Container>
        {epicRenderInfo.map(({ id, length, exceedsLeft, exceedsRight, index, status }) => (
          <RoadmapItem
            key={id}
            id={id}
            status={status}
            columns={COLUMNS}
            index={index}
            length={length}
            exceedsLeft={exceedsLeft}
            exceedsRight={exceedsRight}
          />
        ))}
      </S.Container>
    </>
  );
};

export default RoadmapBars;
