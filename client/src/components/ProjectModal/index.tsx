import React, { useEffect, useRef, useState } from 'react';
import produce from 'immer';
import { Modal } from '@/lib/design';
import Styled from '@/components/ProjectModal/style';
import { useInput } from '@/lib/hooks';
import { ProjectType } from '@/types/project';
import { UserInfoWithProject } from '@/types/users';
import SearchBar from '@/lib/design/SearchBar';
import TeamManagementItem from '@/components/TeamManagementItem';

type ProjectModalProps = {
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  project: ProjectType;
  userList: UserInfoWithProject[];
};

const ProjectModal = ({
  showProjectModal,
  setShowProjectModal,
  project,
  userList,
}: ProjectModalProps) => {
  // 현재 모달로 열린 프로젝트를 가진 유저 리스트
  const thisProjectUsersRef = useRef(
    userList.filter((user) => {
      if (user.projects.find((item) => item.id === project.id)) return true;
      return false;
    }),
  );
  const [renderUsers, setRenderUsers] = useState<UserInfoWithProject[]>([]);
  const { value, onChange, onReset } = useInput('');
  useEffect(() => {
    if (value.length === 0) {
      setRenderUsers(thisProjectUsersRef.current);
      return;
    }
    setRenderUsers(
      thisProjectUsersRef.current.filter((item) => new RegExp(value, 'i').test(item.name)),
    );
  }, [value]);
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
          onChange={onChange}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        />
        <Styled.UserList>
          {renderUsers.map((user) => (
            <TeamManagementItem
              key={user.index}
              imageURL={user.imageURL}
              name={user.name}
              job={user.job}
              admin={user.admin}
            >
              버튼자리
            </TeamManagementItem>
          ))}
        </Styled.UserList>
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default ProjectModal;
