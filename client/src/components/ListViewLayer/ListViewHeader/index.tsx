import React from 'react';
import Styled from '@/components/ListViewLayer/ListViewHeader/style';
import { ListState } from '../ListView';

type ListProps = {
  listState: ListState;
  handleListState: (event: React.MouseEvent) => void;
};

const ListViewHeader = ({ listState, handleListState }: ListProps) => {
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
