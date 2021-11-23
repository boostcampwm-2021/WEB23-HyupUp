import React from 'react';
import Styled from '@/components/ProjectCreateForm/style';
import { Button } from '@/lib/design';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitNewProject: (e: React.FormEvent) => void;
  value: string;
}

const ProjectCreateForm = ({ onSubmitNewProject, onChange, value }: Props) => {
  return (
    <Styled.Form onSubmit={onSubmitNewProject}>
      <Styled.Input placeholder="프로젝트 이름을 입력하세요" onChange={onChange} value={value} />
      <Button
        size="large"
        category="default"
        onClick={() => {
          return;
        }}
      >
        생성
      </Button>
    </Styled.Form>
  );
};

export default ProjectCreateForm;
