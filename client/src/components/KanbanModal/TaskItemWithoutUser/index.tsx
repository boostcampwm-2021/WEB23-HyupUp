import React from 'react';
import Styled from '../KanbanTask/style';
import { DropDown } from '@/lib/design';
import { useRecoilValue } from 'recoil';
import { userListAtom } from '@/recoil/user';

type handleClick = (e: React.MouseEvent) => void;

const TaskItemWithoutUser = ({ handleUserSelect }: { handleUserSelect: handleClick }) => {
  const userListState = useRecoilValue(userListAtom);
  const userListWithId = userListState.map((value) => {
    return { ...value, id: value.index };
  });

  return (
    <Styled.DropdownWrapper>
      <DropDown list={userListWithId} handleClick={handleUserSelect} isMeatBall={true} />
    </Styled.DropdownWrapper>
  );
};

export default TaskItemWithoutUser;
