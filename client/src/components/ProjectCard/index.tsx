import React from 'react';
import { ProjectType } from '@/types/project';
import Styled from '@/components/ProjectCard/style';

type Props = { project: ProjectType };

const ProjectCard = ({ project }: Props) => {
  return (
    <Styled.CardWrapper>
      <Styled.CardHeader>
        <h3>{project.name}</h3>
      </Styled.CardHeader>
      <Styled.CardImage projectId={project.id} />
    </Styled.CardWrapper>
  );
};

export default ProjectCard;
