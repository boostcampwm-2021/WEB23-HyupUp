import React, { useState } from 'react';
import Styled from '@/components/ListViewLayer/ListViewHeader/style';

type ListState = 'all' | 'private' | 'project' | 'done';

const ListViewHeader = () => {
  const [listState, setListState] = useState<ListState>('all');

  const handleListState = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.id) return;
    setListState(target.id as ListState);
  };
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
