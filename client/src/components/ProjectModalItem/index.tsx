import React, { useState } from 'react';
import Styled from '@/components/ProjectModalItem/style';
import TeamManagementItem from '@/components/TeamManagementItem';
import { UserInfoWithProject } from '@/types/users';
import { ProjectType } from '@/types/project';

interface ProjectModalItemProps {
  user: UserInfoWithProject;
  project: ProjectType;
  inviteUserIntoProject: (userId: number, projectObj: ProjectType) => void;
}

const ProjectModalItem = ({ user, project, inviteUserIntoProject }: ProjectModalItemProps) => {
  const [isClickedMinus, setIsClickedMinus] = useState<boolean>(false);

  const onClickMinus = () => {
    setIsClickedMinus((prev) => !prev);
  };
  return (
    <>
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
    </>
  );
};

export default ProjectModalItem;
