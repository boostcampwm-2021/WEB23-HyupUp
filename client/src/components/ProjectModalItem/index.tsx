import React, { useState } from 'react';
import Styled from '@/components/ProjectModalItem/style';
import TeamManagementItem from '@/components/TeamManagementItem';
import { UserInfoWithProject } from '@/types/users';
import { ProjectType } from '@/types/project';
import { useSetRecoilState } from 'recoil';
import { userListAtom } from '@/recoil/user';
import produce from 'immer';

interface ProjectModalItemProps {
  user: UserInfoWithProject;
  project: ProjectType;
}

const ProjectModalItem = ({ user, project }: ProjectModalItemProps) => {
  const [isClickedMinus, setIsClickedMinus] = useState<boolean>(false);
  const setUserListState = useSetRecoilState(userListAtom);

  const inviteUserIntoProject = (userId: number, projectObj: ProjectType) => {
    setUserListState((prev) =>
      produce(prev, (draft) => {
        const selectedUser = draft.find((user) => user.index === userId);
        selectedUser?.projects.push(projectObj);
      }),
    );
  };

  const removeUserFromProject = (userId: number, projectObj: ProjectType) => {
    setUserListState((prev) =>
      produce(prev, (draft) => {
        const selectedUser = draft.find((user) => user.index === userId);
        selectedUser!.projects = selectedUser!.projects.filter(
          (project) => project.id !== projectObj.id,
        ) as ProjectType[];
      }),
    );
    setIsClickedMinus(false);
  };

  const onClickMinus = () => {
    setIsClickedMinus((prev) => !prev);
  };

  return (
    <>
      <Styled.UserItem>
        <Styled.ItemWrapper isClickedMinus={isClickedMinus}>
          <TeamManagementItem
            imageURL={user.imageURL}
            name={user.name}
            job={user.job}
            admin={user.admin}
          >
            {user.projects.findIndex((elem) => elem.id === project.id) >= 0 ? (
              <Styled.Button isMinus={true} onClick={onClickMinus} />
            ) : (
              <Styled.Button
                isMinus={false}
                onClick={() => inviteUserIntoProject(user.index, project)}
              />
            )}
          </TeamManagementItem>
        </Styled.ItemWrapper>
        <Styled.DeleteBox>
          <Styled.DeleteButton onClick={() => removeUserFromProject(user.index, project)} />
        </Styled.DeleteBox>
      </Styled.UserItem>
    </>
  );
};

export default ProjectModalItem;
