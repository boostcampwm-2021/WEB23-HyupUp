import { StatusType, dragRefObjectType, dragCategoryType } from '@/types/story';

export const handleDragStart = (
  e: React.DragEvent<HTMLElement>,
  order: number,
  category: StatusType,
  dragRef: dragRefObjectType,
  dragCategory: dragCategoryType,
) => {
  dragRef.current = order;
  dragCategory.current = category;
};

export const handleDragEnter = (
  e: React.DragEvent<HTMLElement>,
  order: number,
  category: StatusType,
  dragOverRef: dragRefObjectType,
  dragOverCategory: dragCategoryType,
) => {
  dragOverRef.current = order;
  dragOverCategory.current = category;
};
