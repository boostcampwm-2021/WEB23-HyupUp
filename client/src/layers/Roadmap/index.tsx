import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import S from './style';
import { createEpic, getEpicById, updateEpicById } from '@/lib/api/epic';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { useSocketReceive, useSocketSend } from '@/lib/hooks';
import userAtom from '@/recoil/user';

import EpicPlaceholder from '@/components/EpicPlaceholder';
import RoadmapCalendar from '@/components/RoadmapCalendar';
import EpicEntryItem from '@/components/EpicEntryItem';
import Button from '@/lib/design/Button';

import { getOrderMedian } from '@/lib/utils/epic';
import { errorMessage } from '@/lib/common/message';
import { EpicType } from '@/types/epic';

interface RoadmapProps {
  projectId?: number;
}

const Roadmap = ({ projectId }: RoadmapProps) => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [nowDraggingId, setNowDraggingId] = React.useState(0);
  const userState = useRecoilValue(userAtom);
  const epicsOnProject = useEpicState();

  const dispatchEpic = useEpicDispatch();

  const emitNewEpic = useSocketSend('NEW_EPIC');
  const emitUpdateEpicOrder = useSocketSend('UPDATE_EPIC_ORDER');
  useSocketReceive('UPDATE_EPIC_ORDER', async (updatedEpicId: number) => {
    const updatedEpic = await getEpicById(updatedEpicId);
    if (!updatedEpic) return;
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
  });
  useSocketReceive('GET_EPIC', async (epicId: number) => {
    const data = await getEpicById(epicId);
    if (!data || data.projectId !== userState.currentProjectId) return;
    dispatchEpic({ type: `ADD_EPIC`, epic: data });
  });
  useSocketReceive('DELETE_EPIC', async (epicId: number) => {
    dispatchEpic({ type: 'REMOVE_EPIC', id: epicId });
  });
  useSocketReceive('UPDATE_EPIC_STORY', async (epicId: number) => {
    const data = await getEpicById(epicId);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: data as EpicType,
    });
  });

  const getMaxOrder = () => {
    return epicsOnProject.length ? Math.max(...epicsOnProject.map((epic) => epic.order)) : 0;
  };

  const handleSubmit = async (
    value: string,
    { startDate, endDate }: { startDate: Date; endDate: Date },
  ) => {
    try {
      if (!projectId) throw new Error(errorMessage.GET_PROJECT);
      const result = await createEpic(projectId, value, Math.ceil(getMaxOrder() + 1));
      if (!result) return;

      dispatchEpic({
        type: 'ADD_EPIC',
        epic: {
          id: result.id,
          projectId: userState.currentProjectId as number,
          name: value,
          startAt: startDate,
          endAt: endDate,
          order: Math.ceil(getMaxOrder() + 1),
        },
      });
      setInputVisible(false);
      emitNewEpic(result.id);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleDrop = async (order: number) => {
    const median = getOrderMedian(epicsOnProject, order);
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const nowDraggingEpic = epicsOnProject.find((epic) => epic.id === nowDraggingId)!;
    if (nowDraggingEpic.order === order) {
      setNowDraggingId(0);
      return;
    }

    await updateEpicById(nowDraggingId, {
      ...nowDraggingEpic,
      order: median,
    });
    emitUpdateEpicOrder(nowDraggingId);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: {
        ...nowDraggingEpic,
        order: median,
      },
    });

    setNowDraggingId(0);
  };

  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.EpicEntry>
          {epicsOnProject.map((epic) => (
            <EpicEntryItem
              key={epic.id}
              handleDragStart={() => setNowDraggingId(epic.id)}
              handleDrop={(targetOrder: number) => handleDrop(targetOrder)}
              epicData={epic}
            />
          ))}
          <EpicEntryItem
            isEmpty
            handleDragStart={() => {
              /* no-op */
            }}
            handleDrop={() => handleDrop(Math.ceil(getMaxOrder() + 1))}
            epicData={{
              id: 0,
              projectId: 0,
              name: '',
              order: Math.ceil(getMaxOrder() + 1),
              startAt: new Date(),
              endAt: new Date(),
            }}
          />
          <EpicPlaceholder
            visible={inputVisible}
            setVisible={setInputVisible}
            handleSubmit={handleSubmit}
          />
          <Button
            size={'small'}
            category={'cancel'}
            onClick={() => setInputVisible((prevState) => !prevState)}
          >
            + Add item
          </Button>
        </S.EpicEntry>
        <RoadmapCalendar />
      </S.Content>
    </S.Container>
  );
};

export default Roadmap;
