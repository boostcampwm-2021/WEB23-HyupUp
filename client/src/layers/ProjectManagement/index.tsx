import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { createProject, getAllOrgProjects } from '@/lib/api/project';
import { useInput } from '@/lib/hooks';
import ProjectCreateForm from '@/components/ProjectCreateForm';
import { ProjectType } from '@/types/project';

export const ProjectManagement = () => {
  const userState = useRecoilValue(userAtom);
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const { value, onChange } = useInput('');

  const onSubmitNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.length) return;
    const newProject = await createProject(value, userState.id as number);
  };

  useEffect(() => {
    (async () => {
      const projects = await getAllOrgProjects(userState.organization!);
      if (!projects) return;
      console.log(projects);
      setProjectList([...projects]);
    })();
  }, [userState.organization]);

  return (
    <>
      <ProjectCreateForm onSubmitNewProject={onSubmitNewProject} onChange={onChange} />
      {projectList.map((project, index) => {
        <div key={index}>
          <div>test</div>
          <div>{project.name}</div>;
        </div>;
      })}
    </>
  );
};
