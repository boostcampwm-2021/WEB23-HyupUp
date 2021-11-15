import * as React from 'react';
import { toast } from 'react-toastify';
import S from './style';
import EpicPlaceholder from '../../components/EpicPlaceholder';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { createEpic } from '@/lib/api/epic';
import useSocketSend from '@/lib/hooks/useSocketSend';
import RoadmapCalendar from '@/components/RoadmapCalendar';
import Button from '@/lib/design/Button';

interface RoadmapProps {
  projectId?: number;
}

const Roadmap = ({ projectId }: RoadmapProps) => {
  const [inputVisible, setInputVisible] = React.useState(false);
  const epicsOnProject = useEpicState();
  const epicDispatcher = useEpicDispatch();
  const emitNewEpic = useSocketSend('NEW_EPIC');

  const handleSubmit = async (value: string) => {
    try {
      if (!projectId) throw new Error('유저 정보 없음');
      const { id } = await createEpic(projectId, value);
      if (id === -1) throw new Error('에픽 생성 실패');
      epicDispatcher({
        type: 'ADD_EPIC',
        epic: {
          id: id,
          name: value,
          startAt: new Date(),
          endAt: new Date(),
        },
      });
      setInputVisible(false);
      emitNewEpic(id);
      toast.success('에픽 생성 완료!');
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <S.Container>
      <S.Title>프로젝트 로드맵</S.Title>
      <S.Content>
        <S.EpicEntry>
          {epicsOnProject?.map(({ name }, i) => (
            <S.EpicEntryItem key={name + i.toString()}>{name}</S.EpicEntryItem>
          ))}
          <EpicPlaceholder visible={inputVisible} handleSubmit={handleSubmit}></EpicPlaceholder>
          <Button
            size={'small'}
            category={'cancel'}
            onClick={() => setInputVisible((prevState) => !prevState)}
          >
            + Add item
          </Button>
        </S.EpicEntry>
        <RoadmapCalendar></RoadmapCalendar>
      </S.Content>
    </S.Container>
  );
};

export default Roadmap;
