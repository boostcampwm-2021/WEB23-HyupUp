import React, { useEffect, useState } from 'react';
import produce from 'immer';
import { Modal } from '@/lib/design';
import Styled from '@/components/ProjectModal/style';
import { useInput } from '@/lib/hooks';
import { ProjectType } from '@/types/project';
import { UserInfoWithProject } from '@/types/users';
import SearchBar from '@/lib/design/SearchBar';

import { useRecoilState } from 'recoil';
import { userListAtom } from '@/recoil/user';
import ProjectModalItem from '@/components/ProjectModalItem';

type ProjectModalProps = {
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  project: ProjectType;
};

const ProjectModal = ({ showProjectModal, setShowProjectModal, project }: ProjectModalProps) => {
  const [userListState, setUserListState] = useRecoilState(userListAtom);
  const [renderUsers, setRenderUsers] = useState<UserInfoWithProject[]>([]);
  const { value, onChange } = useInput('');
  useEffect(() => {
    if (value.length === 0) {
      setRenderUsers(userListState);
      return;
    }
    setRenderUsers(userListState.filter((item) => new RegExp(value, 'i').test(item.name)));
  }, [userListState, value]);

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
  };

  return (
    <Modal
      title={project.name}
      shouldConfirm={false}
      visible={showProjectModal}
      onClose={() => setShowProjectModal(false)}
      size="LARGE"
    >
      <Styled.ContentWrapper>
        <SearchBar
          color="gray"
          value={value}
          placeholder="찾으시는 팀원의 이름을 입력하세요."
          onChange={onChange}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        />
        <Styled.UserList>
          {renderUsers.map((user) => (
            <div key={user.index}>
              <ProjectModalItem
                inviteUserIntoProject={inviteUserIntoProject}
                project={project}
                user={user}
              />
              <Styled.DeleteBox>
                <Styled.DeleteButton onClick={() => removeUserFromProject(user.index, project)} />
              </Styled.DeleteBox>
            </div>
          ))}
        </Styled.UserList>
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default ProjectModal;
