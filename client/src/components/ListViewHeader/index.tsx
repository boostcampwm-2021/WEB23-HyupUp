import React from 'react';
import Styled from '@/components/ListViewHeader/style';
import { ListState } from '../../layers/ListView';
import { useSocketReceive } from '@/lib/hooks';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { toast } from 'react-toastify';
import { successMessage } from '@/lib/common/message';

type ListProps = {
  listState: ListState;
  handleListState: (event: React.MouseEvent) => void;
};

const ListViewHeader = ({ listState, handleListState }: ListProps) => {
  const userState = useRecoilValue(userAtom);
  useSocketReceive('NEW_TASK', async (userId: number) => {
    if (userState.id === userId) toast.success(successMessage.UPDATE_TASK);
  });

  return (
    <Styled.Container onClick={handleListState}>
      <Styled.StateButton id="all" active={'all' === listState}>
        전체 업무
      </Styled.StateButton>
      <Styled.StateButton id="private" active={'private' === listState}>
        개인 업무
      </Styled.StateButton>
      <Styled.StateButton id="project" active={'project' === listState}>
        팀 업무
      </Styled.StateButton>
      <Styled.StateButton id="done" active={'done' === listState}>
        완료한 업무
      </Styled.StateButton>
    </Styled.Container>
  );
};

export default ListViewHeader;
