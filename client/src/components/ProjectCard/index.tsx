import React, { useState } from 'react';
import { ProjectType } from '@/types/project';
import { DropDown, Modal } from '@/lib/design';
import Styled from '@/components/ProjectCard/style';

type Props = {
  project: ProjectType;
  deleteProject: (id: number) => Promise<void>;
};

const dropdownList = [
  { id: 1, name: '팀원추가' },
  { id: 2, name: '삭제' },
];

const ProjectCard = ({ project, deleteProject }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openModalHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'LI') return;
    if (target.innerHTML === '삭제') {
      setShowDeleteModal(true);
    }
  };
  return (
    <Styled.CardWrapper>
      <Styled.CardHeader>
        <h3>{project.name}</h3>
        <DropDown list={dropdownList} handleClick={openModalHandler} isMeatBall={true} />
      </Styled.CardHeader>
      <Styled.CardImage projectId={project.id} />
      <Modal
        shouldConfirm
        title={'해당 프로젝트를 삭제하시겠습니까?'}
        visible={showDeleteModal}
        onClickCancel={() => console.log('cancel')}
        onClickOk={() => deleteProject(project.id)}
        onClose={() => setShowDeleteModal(false)}
      ></Modal>
    </Styled.CardWrapper>
  );
};

export default ProjectCard;
