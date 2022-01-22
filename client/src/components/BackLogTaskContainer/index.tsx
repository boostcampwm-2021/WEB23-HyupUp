import React from 'react';
import Styled from './style';
import { useRecoilValue } from 'recoil';

import * as avatar from '@/lib/common/avatar';
import { ImageType } from '@/types/image';
import { tasksSelector } from '@/recoil/story';
import BackLogTask from '@/components/BackLogTask';

const BackLogTaskContainer = ({ storyId }: { storyId: number }) => {
  const tasksState = useRecoilValue(tasksSelector(storyId));
  return (
    <Styled.TaskContainer>
      {tasksState.length ? (
        tasksState.map((el) => (
          <BackLogTask
            key={el.id}
            name={el.user}
            imageURL={avatar[el.userImage as ImageType]}
            task={el.name}
          />
        ))
      ) : (
        <Styled.UndefinedItemContainer>
          <Styled.UndefinedText>
            칸반보드의 스토리를 클릭하여 Task를 추가해보세요
          </Styled.UndefinedText>
        </Styled.UndefinedItemContainer>
      )}
    </Styled.TaskContainer>
  );
};

export default BackLogTaskContainer;
