/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import S from './style';
import RoadmapItem from '@/components/RoadmapItem';
import { useEpicState, useStoryState } from '@/lib/hooks/useContextHooks';
import { makeEpicRenderInfo } from '@/lib/utils/epic';
import { toast } from 'react-toastify';
import { errorMessage } from '@/lib/common/message';

const COLUMNS = 15;

interface RoadmapBarsProps {
  rangeFrom: Date;
  rangeTo: Date;
}

const RoadmapBars = ({ rangeFrom, rangeTo }: RoadmapBarsProps) => {
  const epics = useEpicState();
  const stories = useStoryState();
  const epicRenderInfo = makeEpicRenderInfo(epics, stories, {
    rangeFrom,
    rangeTo,
    columns: COLUMNS,
  });

  return (
    <>
      <S.Container
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => toast.error(errorMessage.UPDATE_EPIC)}
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
