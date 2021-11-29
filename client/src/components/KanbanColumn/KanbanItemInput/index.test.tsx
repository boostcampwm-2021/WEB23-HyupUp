import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomRender from 'client/__test__/CustomRender';
import { KanbanItemInput } from '@/components';
import { ItemInput } from '@/types/story';

const story = {
  id: 1,
  name: '',
  status: 'TODO',
  order: 0,
  projectId: 1,
  epicId: 1,
};

const epic = {
  id: 1,
  name: 'EpicTest',
  startAt: new Date(),
  endAt: new Date(),
  order: 0,
  projectId: 1,
};

function renderKanbanItemInput({ story, epic }: ItemInput) {
  const kanbanItemInput = CustomRender(<KanbanItemInput story={story} epic={epic} />);

  const itemInput = () => kanbanItemInput.getByPlaceholderText('Type a Todo ...');
  const epicText = () => kanbanItemInput.getByText('EpicTest');

  async function clickItemInput() {
    await act(async () => {
      userEvent.click(itemInput());
    });
  }

  async function typeTextInput(name: string) {
    await act(async () => {
      userEvent.type(itemInput(), name);
    });
  }

  return {
    itemInput,
    epicText,
    clickItemInput,
    typeTextInput,
  };
}

describe('<KanbanItemInput />', () => {
  it('칸반 ItemInput 컴포넌트가 나타나며, Type a Todo Placeholder 를 볼 수 있다', () => {
    const { itemInput } = renderKanbanItemInput({ story, epic });

    expect(itemInput()).toBeInTheDocument();
  });

  it('에픽이 존재하면 에픽의 이름인 EpicTest 가 나타난다', () => {
    const { epicText } = renderKanbanItemInput({ story, epic });

    expect(epicText()).toBeInTheDocument();
  });

  it('Type a Todo Placeholder 클릭 시 focus 된다', async () => {
    const { itemInput, clickItemInput } = renderKanbanItemInput({ story, epic });

    await clickItemInput();

    expect(itemInput()).toHaveFocus();
  });

  it('input 에 StoryTest 를 입력 시 해당 텍스트가 동일하게 나타난다', async () => {
    const { itemInput, typeTextInput } = renderKanbanItemInput({ story, epic });

    await typeTextInput('StoryTest');

    expect(itemInput()).toHaveValue('StoryTest');
  });
});
