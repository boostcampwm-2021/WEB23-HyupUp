import * as React from 'react';
import { toast } from 'react-toastify';
import S from './style';
import EpicPlaceholder from '@/components/EpicPlaceholder';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { createEpic, updateEpicById } from '@/lib/api/epic';
import useSocketSend from '@/lib/hooks/useSocketSend';
import RoadmapCalendar from '@/components/RoadmapCalendar';
import Button from '@/lib/design/Button';
import { errorMessage, successMessage } from '@/lib/common/message';
import { getOrderMedian } from '@/lib/utils/epic';

interface RoadmapProps {
  projectId?: number;
}

const Roadmap = ({ projectId }: RoadmapProps) => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const [nowDragging, setNowDragging] = React.useState({ id: 0, over: 0 });
  const epicsOnProject = useEpicState();
  const epicDispatcher = useEpicDispatch();
  const emitNewEpic = useSocketSend('NEW_EPIC');

  const makeNewAction = (id: number, name: string, order: number) => ({
    type: 'ADD_EPIC' as const,
    epic: {
      id,
      name,
      startAt: new Date(),
      endAt: new Date(),
      order,
    },
  });

  const getMaxOrder = () => {
    return Math.max(...epicsOnProject.map((epic) => epic.order));
  };

  const handleSubmit = async (value: string) => {
    try {
      if (!projectId) throw new Error(errorMessage.GET_PROJECT);
      const result = await createEpic(projectId, value, Math.ceil(getMaxOrder() + 1));
      if (!result) return;

      epicDispatcher(makeNewAction(result.id, value, Math.ceil(getMaxOrder() + 1)));
      setInputVisible(false);
      emitNewEpic(result.id);

      toast.success(successMessage.CREATE_EPIC);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleDrop = (order: number) => {
    const median = getOrderMedian(epicsOnProject, order);
    toast.info(`moved ${nowDragging.id} order: ${order}`);
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const nowDraggingEpic = epicsOnProject.find((epic) => epic.id === nowDragging.id)!;

    updateEpicById(nowDragging.id, {
      ...nowDraggingEpic,
      order: median,
    });
    epicDispatcher({
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
