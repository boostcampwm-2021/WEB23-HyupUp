import * as React from 'react';
import { toast } from 'react-toastify';
import S from './style';
import EpicPlaceholder from '@/components/EpicPlaceholder';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { createEpic, getEpicById, updateEpicById } from '@/lib/api/epic';
import useSocketSend from '@/lib/hooks/useSocketSend';
import RoadmapCalendar from '@/components/RoadmapCalendar';
import Button from '@/lib/design/Button';
import { errorMessage, successMessage } from '@/lib/common/message';
import { getOrderMedian } from '@/lib/utils/epic';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { useSocketReceive } from '@/lib/hooks';

interface RoadmapProps {
  projectId?: number;
}

const Roadmap = ({ projectId }: RoadmapProps) => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [nowDragging, setNowDragging] = React.useState({ id: 0, over: 0 });
  const epicsOnProject = useEpicState();
  const userState = useRecoilValue(userAtom);

  const dispatchEpic = useEpicDispatch();
  const emitNewEpic = useSocketSend('NEW_EPIC');
  const emitUpdateEpicOrder = useSocketSend('UPDATE_EPIC_ORDER');
  useSocketReceive('UPDATE_EPIC_ORDER', async (updatedEpicId: number) => {
    const updatedEpic = await getEpicById(updatedEpicId);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic!,
    });
  });

  const getMaxOrder = () => {
    return epicsOnProject.length ? Math.max(...epicsOnProject.map((epic) => epic.order)) : 0;
  };

  const handleSubmit = async (value: string) => {
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
          startAt: new Date(),
          endAt: new Date(),
          order: Math.ceil(getMaxOrder() + 1),
        },
      });
      setInputVisible(false);
      emitNewEpic(result.id);

      toast.success(successMessage.CREATE_EPIC);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleDrop = async (order: number) => {
    const median = getOrderMedian(epicsOnProject, order);
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const nowDraggingEpic = epicsOnProject.find((epic) => epic.id === nowDragging.id)!;

    await updateEpicById(nowDragging.id, {
      ...nowDraggingEpic,
      order: median,
    });
    emitUpdateEpicOrder(nowDragging.id);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: {
        ...nowDraggingEpic,
        order: median,
      },
    });

    setNowDragging({ id: 0, over: 0 });
  };

  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.EpicEntry>
          {epicsOnProject.map(({ id, name, order }) => (
            <S.EpicEntryItem
              activated={id === nowDragging.over}
              key={id}
              draggable="true"
              onDragStart={() => setNowDragging({ id, over: id })}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setNowDragging({ id: nowDragging.id, over: id })}
              onDragLeave={() => setNowDragging({ id: nowDragging.id, over: 0 })}
              onDrop={() => handleDrop(order)}
            >
              {name}
            </S.EpicEntryItem>
          ))}
          <S.EpicEntryItem
            activated={nowDragging.over === Math.ceil(getMaxOrder() + 1)}
            draggable="false"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() =>
              setNowDragging({ id: nowDragging.id, over: Math.ceil(getMaxOrder() + 1) })
            }
            onDrop={() => handleDrop(getMaxOrder() + 1)}
          />
          <EpicPlaceholder visible={inputVisible} handleSubmit={handleSubmit} />
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
