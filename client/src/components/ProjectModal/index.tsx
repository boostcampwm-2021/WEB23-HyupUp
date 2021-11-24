import { Modal } from '@/lib/design';
import React from 'react';

type ProjectModalProps = {
  showProjectModal: boolean;
  setShowProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectModal = ({ showProjectModal, setShowProjectModal }: ProjectModalProps) => {
  return (
    <Modal
      shouldConfirm={false}
      visible={showProjectModal}
      onClose={() => setShowProjectModal(false)}
      size="LARGE"
    ></Modal>
  );
};

export default ProjectModal;
