import * as React from 'react';
import Button from '@/lib/design/Button';
import S from './style';
import EpicPlaceholder from '../EpicPlaceholder';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { createEpic } from '@/lib/api/epic';

const Roadmap = () => {
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
              // TODO: 프로젝트 이름을 전달해서 작동하도록 수정
              const { id } = await createEpic(1, value);
              // FIXME: 에픽 입력을 완료했을 때 에픽 생성에 성공했다면 context 에 추가해주는 로직
              // userContext와 연동을 하지 못한 상태라 Project를 넣어줄 수 없음
              //
              // if (id !== -1) {
              //   epicDispatcher({
              //     type: 'ADD_EPIC',
              //     epic: {
              //       id: id,
              //       name: value,
              //       startAt: new Date(),
              //       endAt: new Date(),
              //       projects: null, // <--
              //     },
              //   });
              // }
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
