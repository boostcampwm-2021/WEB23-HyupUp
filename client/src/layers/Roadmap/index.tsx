import * as React from 'react';
import { toast } from 'react-toastify';
import S from './style';
import EpicPlaceholder from '@/components/EpicPlaceholder';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { createEpic } from '@/lib/api/epic';
import useSocketSend from '@/lib/hooks/useSocketSend';
import RoadmapCalendar from '@/components/RoadmapCalendar';
import Button from '@/lib/design/Button';
import { errorMessage, successMessage } from '@/lib/common/message';

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
      const result = await createEpic(projectId, value, getMaxOrder() + 1);
      if (!result) return;

      epicDispatcher(makeNewAction(result.id, value, getMaxOrder() + 1));
      setInputVisible(false);
      emitNewEpic(result.id);

      toast.success(successMessage.CREATE_EPIC);
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const handleDrop = (id: number, order: number) => {
    toast.info(`moved ${nowDragging.id} over ${id}, order: ${order}`);
    setNowDragging({ id: 0, over: 0 });
  };

  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.EpicEntry>
          {epicsOnProject?.map(({ id, name, order }) => (
            <S.EpicEntryItem
              activated={id === nowDragging.over}
              key={id}
              draggable="true"
              onDragStart={() => setNowDragging({ id, over: id })}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={() => setNowDragging({ id: nowDragging.id, over: id })}
              onDrop={() => handleDrop(id, order)}
            >
              {name}
            </S.EpicEntryItem>
          ))}
          <S.EpicEntryItem
            activated={nowDragging.over === -1}
            draggable="true"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setNowDragging({ id: nowDragging.id, over: -1 })}
            onDrop={() => handleDrop(-1, getMaxOrder() + 1)}
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
