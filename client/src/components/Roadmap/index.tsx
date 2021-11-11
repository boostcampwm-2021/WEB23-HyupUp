import * as React from 'react';
import Button from '@/lib/design/Button';
import S from './style';
import EpicPlaceholder from '../EpicPlaceholder';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { createEpic } from '@/lib/api/epic';

interface RoadmapProps {
  projectId?: number;
}

const Roadmap = ({ projectId }: RoadmapProps) => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const epics = useEpicState();
  // TODO: 현재 프로젝트 이름을 context에서 받아오도록 수정
  const epicsOnProject = epics;
  const epicDispatcher = useEpicDispatch();

  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.EpicEntry>
          {epicsOnProject?.map(({ name }, i) => (
            <S.EpicEntryItem key={name + i.toString()}>{name}</S.EpicEntryItem>
          ))}
          <EpicPlaceholder
            visible={inputVisible}
            handleSubmit={async (value) => {
              if (!projectId) return;
              const { id } = await createEpic(projectId, value);
              if (id !== -1) {
                epicDispatcher({
                  type: 'ADD_EPIC',
                  epic: {
                    id: id,
                    name: value,
                    startAt: new Date(),
                    endAt: new Date(),
                  },
                });
              }
              setInputVisible(false);
            }}
          ></EpicPlaceholder>
          <Button
            size={'small'}
            category={'cancel'}
            onClick={() => setInputVisible((prevState) => !prevState)}
          >
            + Add item
          </Button>
        </S.EpicEntry>
        <S.RoadmapCalendar>content</S.RoadmapCalendar>
      </S.Content>
    </S.Container>
  );
};

export default Roadmap;
