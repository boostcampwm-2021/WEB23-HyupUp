import { StoryType, dragRefObjectType, dragCategoryType, StatusType } from '@/types/story';

const sortStoryByOrder = (a: StoryType, b: StoryType): number => {
  if (Number(a.order) - Number(b.order) >= 0) return 1;
  else return -1;
};

export const dragToEqualTop = (
  itemList: StoryType[],
  dragRef: dragRefObjectType,
): { firstItem: StoryType; secondItem: StoryType } => {
  const toBeChangeItem = itemList.find((v) => v.order === dragRef.current);
  const sortedListItems = itemList.sort((a, b) => sortStoryByOrder(a, b)).slice(0, 2);
  const averageOrder = sortedListItems.length > 1 ? Number(sortedListItems[1].order) / 2 : 1;
  return {
    firstItem: {
      ...toBeChangeItem,
      order: 0,
    },
    secondItem: {
      ...sortedListItems[0],
      order: averageOrder,
    },
  };
};

export const dragToEqualBetween = (
  itemList: StoryType[],
  dragRef: dragRefObjectType,
  dragOverRef: dragRefObjectType,
): StoryType => {
  const toBeChangeItem = itemList.find((v) => v.order === dragRef.current);
  const dragOverOrderList = itemList
    .map((v) => Number(v.order))
    .filter((v) => v >= Number(dragOverRef.current))
    .slice(0, 2);
  const orderSum = dragOverOrderList.reduce((prev, cur) => prev + cur, 0);
  const avgOrderSum = dragOverOrderList.length > 1 ? orderSum / 2 : orderSum + 1;
  return {
    ...toBeChangeItem,
    order: avgOrderSum,
  };
};

export const dragToDiffBetween = (
  storyList: StoryType[],
  category: StatusType,
  dragCategory: dragCategoryType,
  dragRef: dragRefObjectType,
  dragOverRef: dragRefObjectType,
): StoryType => {
  const toBeChangeItem = storyList
    .filter((v) => v.status === dragCategory.current)
    .find((v) => v.order === dragRef.current);
  const dragOverOrderList = storyList
    .filter((v) => v.status === category)
    .map((v) => Number(v.order))
    .filter((v) => v >= Number(dragOverRef.current))
    .slice(0, 2);
  const sumOfOrder = dragOverOrderList.reduce((prev, cur) => prev + cur, 0);
  const avgOrderSum = dragOverOrderList.length > 1 ? sumOfOrder / 2 : sumOfOrder + 1;
  return {
    ...toBeChangeItem,
    status: category,
    order: avgOrderSum,
  };
};
