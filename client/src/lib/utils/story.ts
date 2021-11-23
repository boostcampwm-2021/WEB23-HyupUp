import { StoryType, dragRefObjectType } from '@/types/story';

const sortStoryByOrder = (a: StoryType, b: StoryType): number => {
  if (Number(a.order) - Number(b.order) >= 0) return 1;
  else return -1;
};

export const dragToEqualTop = (
  itemList: StoryType[],
  draggingRef: dragRefObjectType,
): { firstItem: StoryType; secondItem: StoryType } => {
  const toBeChangeItem = itemList.find((v) => v.order === draggingRef.current);
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
