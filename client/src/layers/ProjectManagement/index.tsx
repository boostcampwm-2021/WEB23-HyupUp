import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import produce from 'immer';
import { toast } from 'react-toastify';

import Styled from '@/layers/ProjectManagement/style';
import { warningMessage } from '@/lib/common/message';
import userAtom, { userListAtom } from '@/recoil/user';
import { createProject, deleteProjectById, getAllProjectsByOrg } from '@/lib/api/project';
import { useInput } from '@/lib/hooks';
import { ProjectType } from '@/types/project';
import { ProjectCreateForm, ProjectCard } from '@/components';

const ProjectManagement = () => {
  const userState = useRecoilValue(userAtom);
  const setUserListState = useSetRecoilState(userListAtom);
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const { value, onChange, onReset } = useInput('');

  const deleteProject = async (id: number) => {
    const deleteStatus = await deleteProjectById(id);
    if (!deleteStatus) return;
    setProjectList((prev) =>
      produce(prev, (draft) => draft.filter((project) => project.id !== id)),
    );
  };

  const onSubmitNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userState.admin) {
      toast.warn(warningMessage.ADMIN_ACCESS);
      return;
    }
    if (!value.length) return;
    const newProject = await createProject(value, userState.id as number);
    if (!newProject) return;
    setProjectList((prev) =>
      produce(prev, (draft) => {
        draft.unshift(newProject);
      }),
    );
    setUserListState((prev) =>
      produce(prev, (draft) => {
        const thisUser = draft.find((user) => user.index === userState.id);
        thisUser?.projects.push(newProject);
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

export default ProjectManagement;
