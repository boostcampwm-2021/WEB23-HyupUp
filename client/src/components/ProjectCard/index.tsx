import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { ProjectType } from '@/types/project';
import { DropDown, Modal } from '@/lib/design';
import Styled from '@/components/ProjectCard/style';
import { ProjectModal } from '@/components';
import userAtom from '@/recoil/user';
import { warningMessage } from '@/lib/common/message';

type ProjectCardProps = {
  project: ProjectType;
  deleteProject: (id: number) => Promise<void>;
};

const teamMemberManagement = [
  { id: 1, name: '팀원관리' },
  { id: 2, name: '삭제' },
];

const ProjectCard = ({ project, deleteProject }: ProjectCardProps) => {
  const [userState, setUserState] = useRecoilState(userAtom);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const history = useHistory();
  const openModalHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!userState.admin) {
      toast.warn(warningMessage.ADMIN_ACCESS);
      return;
    }
    if (target.tagName !== 'LI') return;
    if (target.innerHTML === teamMemberManagement[0].name) {
      setShowProjectModal(true);
    }
    if (target.innerHTML === teamMemberManagement[1].name) {
      setShowDeleteModal(true);
    }
  };
  const onClickCard = () => {
    if (!userState.projects?.find((elem) => elem.id === project.id)) {
      toast.warn(warningMessage.MOVE_PROJECT);
      return;
    }
    history.push('/work', project);
  };
  return (
    <Styled.CardWrapper>
      <Styled.CardHeader>
        <h3>{project.name}</h3>
        <DropDown list={teamMemberManagement} handleClick={openModalHandler} isMeatBall={true} />
      </Styled.CardHeader>
      <Styled.CardImage projectId={project.id} onClick={onClickCard} />
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
      />
    </Styled.CardWrapper>
  );
};

export default ProjectCard;
