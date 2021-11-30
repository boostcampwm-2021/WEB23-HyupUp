/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { makeEpicRenderInfo } from '@/lib/utils/epic';
import storyListAtom from '@/recoil/story';
import { errorMessage } from '@/lib/common/message';
import { useSocketReceive, useSocketSend } from '@/lib/hooks';

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

  return (
    <>
      <S.Container
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => toast.error(errorMessage.EPIC_DRAG_OUT_OF_PLACE)}
      >
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
