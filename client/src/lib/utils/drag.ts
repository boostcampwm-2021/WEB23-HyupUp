import { StatusType, dragRefObjectType, dragCategoryType } from '@/types/story';

export const handleDragStart = (
  e: React.DragEvent<HTMLElement>,
  order: number,
  category: StatusType,
  draggingRef: dragRefObjectType,
  draggingCategory: dragCategoryType,
) => {
  draggingRef.current = order;
  draggingCategory.current = category;
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
