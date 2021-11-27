import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomRender from 'client/__test__/CustomRender';
import KanbanTask, { KanbanTaskPropType } from './index';
import { DropDown } from '@/lib/design';

function renderKanbanTask(props: Partial<KanbanTaskPropType>) {
  const handleUserSelect = jest.fn();

  const kanbanTask = CustomRender(<KanbanTask {...props} />);
  const dropdown = CustomRender(
    <DropDown list={[{ id: 1, name: 'test' }]} handleClick={handleUserSelect} isMeatBall={true} />,
  );

  const taskNameInput = () => kanbanTask.getByPlaceholderText('Type A Task');
  const dropdownDefaultImg = () => dropdown.getByAltText('meatballimg');
  const dropdownList = () => dropdown.getByRole('list');

  async function clickTaskInput() {
    await act(async () => {
      userEvent.click(taskNameInput());
    });
  }

  async function typeTaskInput(name: string) {
    await act(async () => {
      userEvent.type(taskNameInput(), name);
    });
  }

  async function clickMeatball() {
    await act(async () => {
      userEvent.click(dropdownDefaultImg());
    });
  }

  return {
    taskNameInput,
    dropdownDefaultImg,
    clickTaskInput,
    typeTaskInput,
    clickMeatball,
    dropdownList,
  };
}

describe('<KanbanTask />', () => {
  const task = {
    name: '',
    id: 1,
    preExist: true,
    user: 'testuser',
    userImage: 'noImage',
    userId: 1,
  };

  it('칸반 Input 과 드롭다운 미트볼 이미지를 렌더링해야한다', () => {
    const { taskNameInput, dropdownDefaultImg } = renderKanbanTask({ task: task, storyId: 1 });

    expect(taskNameInput()).toBeInTheDocument();
    expect(dropdownDefaultImg()).toBeInTheDocument();
  });

  it('칸반 아이템을 클릭 시 focus 된다', async () => {
    const { taskNameInput, clickTaskInput } = renderKanbanTask({ task: task, storyId: 1 });

    await clickTaskInput();

    expect(taskNameInput()).toHaveFocus();
  });

  it('칸반 아이템에 TaskTest 값을 입력하면 해당 텍스트가 나타난다', async () => {
    const { taskNameInput, typeTaskInput } = renderKanbanTask({ task: task, storyId: 1 });

    await typeTaskInput('TaskTest');

    expect(taskNameInput()).toHaveValue('TaskTest');
  });

  it('드롭 다운 버튼을 클릭하면 User List 가 나타난다', async () => {
    const { clickMeatball, dropdownList } = renderKanbanTask({ task: task, storyId: 1 });

    await clickMeatball();

    expect(dropdownList()).toBeVisible();
  });
});
