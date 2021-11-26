import React, { useEffect, useState } from 'react';
import { Modal } from '@/lib/design';
import Styled from '@/components/ProjectModal/style';
import { useInput } from '@/lib/hooks';
import { ProjectType } from '@/types/project';
import { UserInfoWithProject } from '@/types/users';
import SearchBar from '@/lib/design/SearchBar';

import { useRecoilValue } from 'recoil';
import { userListAtom } from '@/recoil/user';
import ProjectModalItem from '@/components/ProjectModalItem';

type ProjectModalProps = {
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  project: ProjectType;
};

const ProjectModal = ({ showProjectModal, setShowProjectModal, project }: ProjectModalProps) => {
  const userListState = useRecoilValue(userListAtom);
  const [renderUsers, setRenderUsers] = useState<UserInfoWithProject[]>([]);
  const { value, onChange } = useInput('');
  useEffect(() => {
    if (value.length === 0) {
      setRenderUsers(userListState);
      return;
    }
    setRenderUsers(userListState.filter((item) => new RegExp(value, 'i').test(item.name)));
  }, [userListState, value]);

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
            <ProjectModalItem key={user.index} project={project} user={user} />
          ))}
        </Styled.UserList>
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default ProjectModal;
