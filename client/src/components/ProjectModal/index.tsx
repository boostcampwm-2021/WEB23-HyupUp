import React from 'react';
import { Modal } from '@/lib/design';
import Styled from '@/components/ProjectModal/style';
import { useInput } from '@/lib/hooks';
import { ProjectType } from '@/types/project';
import SearchBar from '@/lib/design/SearchBar';

type ProjectModalProps = {
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  project: ProjectType;
};

const ProjectModal = ({ showProjectModal, setShowProjectModal, project }: ProjectModalProps) => {
  const { value, onChange, onReset } = useInput('');
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
            e.preventDefault;
          }}
        />
        <Styled.UserList></Styled.UserList>
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default ProjectModal;
