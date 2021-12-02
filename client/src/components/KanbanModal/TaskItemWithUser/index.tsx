import React from 'react';
import { KanbanTaskType } from '@/types/story';
import Styled from '../KanbanTask/style';
import { DropDown } from '@/lib/design';
import { useRecoilValue } from 'recoil';
import { userListAtom } from '@/recoil/user';
import { ImageType } from '@/types/image';
import * as avatar from '@/lib/common/avatar';

interface TaskItemWithUserType {
  taskState: KanbanTaskType;
  task: KanbanTaskType;
  handleUserSelect: (e: React.MouseEvent) => void;
}

const TaskItemWithUser = ({ taskState, task, handleUserSelect }: TaskItemWithUserType) => {
  const userListState = useRecoilValue(userListAtom);
  const userListWithId = userListState.map((value) => {
    return { ...value, id: value.index };
  });

  return (
    <Styled.MemberContainer>
      <DropDown
        Title={
          <p>
            <Styled.Profile
              className="userImage"
              src={
                avatar[`${taskState.userImage ? taskState.userImage : task.userImage}` as ImageType]
              }
              alt="userimage"
            />
            <span>{taskState.user ? taskState.user : task.user}</span>
          </p>
        }
        list={userListWithId}
        handleClick={handleUserSelect}
      />
    </Styled.MemberContainer>
  );
};

export default TaskItemWithUser;
