import React, { useState } from 'react';
import { ProjectType } from '@/types/project';
import { DropDown, Modal } from '@/lib/design';
import Styled from '@/components/ProjectCard/style';
import { ProjectModal } from '@/components';
import { UserInfoWithProject } from '@/types/users';

type ProjectCardProps = {
  project: ProjectType;
  deleteProject: (id: number) => Promise<void>;
  userList: UserInfoWithProject[];
};

const teamMemberManagement = [
  { id: 1, name: '팀원관리' },
  { id: 2, name: '삭제' },
];

const ProjectCard = ({ project, deleteProject, userList }: ProjectCardProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const openModalHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'LI') return;
    if (target.innerHTML === teamMemberManagement[0].name) {
      setShowProjectModal(true);
    }
    if (target.innerHTML === teamMemberManagement[1].name) {
      setShowDeleteModal(true);
    }
  };
  return (
    <Styled.CardWrapper>
      <Styled.CardHeader>
        <h3>{project.name}</h3>
        <DropDown list={teamMemberManagement} handleClick={openModalHandler} isMeatBall={true} />
      </Styled.CardHeader>
      <Styled.CardImage projectId={project.id} />
      <Modal
        shouldConfirm
        visible={showDeleteModal}
        onClickCancel={() => console.log('cancel')}
        onClickOk={() => deleteProject(project.id)}
        onClose={() => setShowDeleteModal(false)}
      >
        해당 프로젝트를 삭제하시겠습니까?
      </Modal>
      <ProjectModal
        showProjectModal={showProjectModal}
        setShowProjectModal={setShowProjectModal}
        project={project}
        userList={userList}
      />
    </Styled.CardWrapper>
  );
};

export default ProjectCard;
