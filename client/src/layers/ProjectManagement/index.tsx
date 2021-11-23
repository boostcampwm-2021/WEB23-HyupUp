import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import produce from 'immer';

import Styled from '@/layers/ProjectManagement/style';
import userAtom from '@/recoil/user';
import { createProject, getAllProjectsByOrg } from '@/lib/api/project';
import { useInput } from '@/lib/hooks';
import ProjectCreateForm from '@/components/ProjectCreateForm';
import { ProjectType } from '@/types/project';
import ProjectCard from '@/components/ProjectCard';

export const ProjectManagement = () => {
  const userState = useRecoilValue(userAtom);
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const { value, onChange, onReset } = useInput('');

  const deleteProject = async (id: number) => {
    // TODO: 삭제 API 추가
    setProjectList((prev) =>
      produce(prev, (draft) => draft.filter((project) => project.id !== id)),
    );
  };

  const onSubmitNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.length) return;
    const newProject = await createProject(value, userState.id as number);
    if (!newProject) return;
    setProjectList((prev) =>
      produce(prev, (draft) => {
        draft.unshift(newProject);
      }),
    );
    onReset();
  };

  useEffect(() => {
    const updateProjectList = async () => {
      const projects = await getAllProjectsByOrg(userState.organization!);
      if (!projects) return;
      setProjectList([...projects]);
    };
    updateProjectList();
  }, [userState.organization]);

  return (
    <Styled.ProjectManagementWrapper>
      <ProjectCreateForm
        value={value}
        onSubmitNewProject={onSubmitNewProject}
        onChange={onChange}
      />
      <Styled.ProjectList>
        {projectList.map((project) => (
          <ProjectCard key={project.id} project={project} deleteProject={deleteProject} />
        ))}
      </Styled.ProjectList>
    </Styled.ProjectManagementWrapper>
  );
};
