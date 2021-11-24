import React, { ComponentType, ReactElement } from 'react';
import { KanbanColumn, KanbanItem } from '@/components';
import { KanbanTestType } from '@/types/story';
import { StoryProvider } from '@/contexts/storyContext';
import { ThemeProvider } from 'styled-components';
import theme from '@/styles/theme';
import '@testing-library/jest-dom/extend-expect';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  return {
    ...originReact,
    useRef: jest.fn(),
  };
});

const category = 'TODO';
const dragRef = jest.spyOn(React, 'useRef').mockReturnValue({
  current: 0,
});
const dragOverRef = jest.spyOn(React, 'useRef').mockReturnValue({
  current: 0,
});
const dragCategory = jest.spyOn(React, 'useRef').mockReturnValue({
  current: 'TODO',
});
const dragOverCategory = jest.spyOn(React, 'useRef').mockReturnValue({
  current: 'TODO',
});

const AllStoryProviders = ({ children }: { children: React.FC }) => {
  return (
    <ThemeProvider theme={theme}>
      <StoryProvider>{children}</StoryProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: AllStoryProviders as ComponentType, ...options });

// function renderKanbanItem(props: KanbanTestType) {
//   const kanbanItem = customRender(<KanbanItem {...props} />);
//   return {};
// }

function renderKanbanColumn(props: KanbanTestType) {
  const kanbanColumn = customRender(<KanbanColumn {...props} />);

  const todoColumn = () => kanbanColumn.getByText('TODO');
  const addBtn = () => kanbanColumn.getByText('Add Todo');
  const itemInput = () => kanbanColumn.getByPlaceholderText('type a todo...');

  function clickAddBtn() {
    userEvent.click(addBtn());
  }

  return {
    todoColumn,
    addBtn,
    itemInput,
    clickAddBtn,
  };
}

describe('<KanbanColumn />', () => {
  it('칸반 보드 페이지에서 Todo 칼럼과 Add Todo 를 볼 수 있다', () => {
    const { addBtn, todoColumn } = renderKanbanColumn({
      category,
      dragRef,
      dragOverRef,
      dragCategory,
      dragOverCategory,
    });

    expect(addBtn()).toBeInTheDocument();
    expect(todoColumn()).toBeInTheDocument();
  });

  it('Add Todo 버튼을 클릭하면 새로운 아이템이 나타난다', () => {
    const { clickAddBtn } = renderKanbanColumn({
      category,
      dragRef,
      dragOverRef,
      dragCategory,
      dragOverCategory,
    });

    clickAddBtn();
  });
});
