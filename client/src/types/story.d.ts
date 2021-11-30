import { EpicType } from './epic';

export type StoryListType = StoryType[];

export type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type StoryType = {
  name?: string;
  status?: StoryStatusType;
  id?: number;
  order?: number;
  projectId?: number;
  epicId?: number | null;
};

export type dragRefObjectType = React.MutableRefObject<number | null>;
export type dragCategoryType = React.MutableRefObject<StatusType>;

export interface ItemInput {
  story: StoryType;
  epic: EpicType | undefined;
}

export interface KanbanType {
  category: StatusType;
  dragRef: dragRefObjectType;
  dragOverRef: dragRefObjectType;
  dragCategory: dragCategoryType;
  dragOverCategory: dragCategoryType;
}

//TODO Extends 를 통한 상속
export interface KanbanItemType {
  story: StoryType;
  epic: EpicType | undefined;
  dragRef: dragRefObjectType;
  dragOverRef: dragRefObjectType;
  dragCategory: dragCategoryType;
  dragOverCategory: dragCategoryType;
  handleDragDrop(category: StatusType): void;
}

export interface KanbanTaskType {
  name?: string;
  id?: number;
  preExist?: boolean;
  user?: string;
  userImage?: string;
  userId?: number;
}

export interface KanbanModalType {
  story: StoryType;
  isItemModalOpen: boolean;
  setModalOpen: (arg: boolean) => void;
}

export interface TaskProps {
  name: string;
  id: number;
  user?: string;
  userImage?: string;
  userId?: number;
}
