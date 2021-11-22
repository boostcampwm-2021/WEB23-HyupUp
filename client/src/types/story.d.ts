export type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type StoryType = {
  name: string;
  status: StoryStatusType;
  id?: number;
  order?: number;
  projectId?: number;
  epicId?: number;
};

export interface KanbanType {
  storyList: Array<StoryType>;
  category: StatusType;
  draggingRef: React.MutableRefObject<number | null>;
  dragOverRef: React.MutableRefObject<number | null>;
  categoryRef: React.MutableRefObject<StatusType>;
}

export interface KanbanItemType {
  story: StoryType;
  handleDragStart(e: React.DragEvent<HTMLElement>, order: number, category: StatusType): void;
  handleDragEnter(e: React.DragEvent<HTMLElement>, order: number, category: StatusType): void;
  handleDragDrop(e: React.DragEvent<HTMLElement>, order: number, category: StatusType): void;
}
