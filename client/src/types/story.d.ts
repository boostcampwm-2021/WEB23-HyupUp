export type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type StoryType = {
  name?: string;
  status?: StoryStatusType;
  id?: number;
  order?: number;
  projectId?: number;
  epicId?: number;
};

export type dragRefObjectType = React.MutableRefObject<number | null>;
export type dragCategoryType = React.MutableRefObject<StatusType>;

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
  dragRef: dragRefObjectType;
  dragOverRef: dragRefObjectType;
  dragCategory: dragCategoryType;
  dragOverCategory: dragCategoryType;
  handleDragDrop(category: StatusType): void;
}
