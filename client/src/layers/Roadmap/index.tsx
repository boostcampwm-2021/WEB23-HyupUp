import * as React from 'react';
import { toast } from 'react-toastify';
import S from './style';
import EpicPlaceholder from '../../components/EpicPlaceholder';
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
  const epicsOnProject = useEpicState();
  const epicDispatcher = useEpicDispatch();
  const emitNewEpic = useSocketSend('NEW_EPIC');

  const makeNewAction = (id: number, name: string) => ({
    type: 'ADD_EPIC' as const,
    epic: {
      id,
      name,
      startAt: new Date(),
      endAt: new Date(),
    },
  });

  const handleSubmit = async (value: string) => {
    try {
      if (!projectId) throw new Error(errorMessage.GET_PROJECT);
      const result = await createEpic(projectId, value);
      // FIXME: 에러 핸들링을 어디서 처리해야하나?
      // createEpic의 결과를 확인하고 여기서 에러처리
      // 또는 createEpic 내부에서 에러처리
      // 현재는 후자의 방법을 사용중
      // 전자의 방법을 사용한다면 createEpic 함수 내부의 toast 알림 제거 후 return 문을 throw문으로 교체
      if (!result) return;

      epicDispatcher(makeNewAction(result.id, value));
      setInputVisible(false);
      emitNewEpic(result.id);

      toast.success(successMessage.CREATE_EPIC);
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
