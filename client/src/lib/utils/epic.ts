import {
  CalendarRange,
  EpicRenderInfo,
  EpicType,
  EpicWithString,
  RoadmapBarsStatus,
} from '@/types/epic';
import { StoryType } from '@/types/story';
import { getDateDiff, isFormer, isLatter, isSameDay, shouldRender } from './date';

export const makeEpicWithDate = (epicWithString: EpicWithString): EpicType => {
  return {
    id: epicWithString.id,
    projectId: epicWithString.projectId,
    name: epicWithString.name,
    startAt: new Date(epicWithString.startAt),
    endAt: new Date(epicWithString.endAt),
    order: epicWithString.order,
  };
};

/**
 *
 * @param epicId 연동된 스토리를 확인할 에픽의 id
 * @param stories 필터링 대상이 될 스토리 객체의 배열
 * @returns 전달한 에픽 id와 연동된 스토리 객체를 상태별로 필터링하여 반환
 */
export const filterStoriesAboutEpic = (epicId: number, stories: StoryType[]) => {
  const todos = stories.filter((story) => story.epicId === epicId && story.status === 'TODO');
  const inProgresses = stories.filter(
    (story) => story.epicId === epicId && story.status === 'IN_PROGRESS',
  );
  const dones = stories.filter((story) => story.epicId === epicId && story.status === 'DONE');
  return { todos, inProgresses, dones };
};

const getStatusFromStories = ({
  todos,
  inProgresses,
  dones,
}: ReturnType<typeof filterStoriesAboutEpic>): RoadmapBarsStatus => {
  if (todos.length === 0 && inProgresses.length === 0) return 'ALL_DONE';
  else if (inProgresses.length === 0 && dones.length === 0) return 'NOT_STARTED';
  else return 'STARTED';
};

// rangeFrom은 현재 캘린더뷰의 시작일자, rangeTo는 끝 일자
// startAt은 에픽 항목의 시작일자, endAt은 에픽 항목의 끝 일자
//
// 에픽 막대를 렌더링해야하는 케이스 (<--> : 캘린더뷰, |--|: 에픽 항목)
// 1: startAt이 rangeFrom 앞, endAt이 rangeFrom 뒤 (왼쪽에 걸쳐있는 경우)
//    <------>
// |----|
//
// 2: startAt이 rangeTo 앞, endAt이 rangeTo 뒤 (오른쪽에 걸쳐있는 경우)
// <------>
//      |-----|
//
// 3: startAt이 rangeFrom 뒤, endAt이 rangeTo 앞 (완전히 포함되는 경우)
// <------>
//   |--|
//
// 4: startAt이 rangeFrom 앞, endAt이 rangeTo 뒤 (완전히 포함하는 경우)
//    <------>
// |-----------|
//
// 그 외의 경우는 캘린더 뷰에 렌더링하지 않아야함
export const makeEpicRenderInfo = (
  epics: EpicType[],
  stories: StoryType[],
  { rangeFrom, rangeTo, columns }: CalendarRange,
): EpicRenderInfo[] =>
  epics.map(({ id, startAt, endAt }) => {
    const case1 = isFormer(startAt, rangeFrom) && isLatter(endAt, rangeFrom);
    const case2 = isFormer(startAt, rangeTo) && isLatter(endAt, rangeTo);
    const case3 = isLatter(startAt, rangeFrom) && isFormer(endAt, rangeTo);
    const case4 = isFormer(startAt, rangeFrom) && isLatter(endAt, rangeTo);

    const render = shouldRender({
      start: startAt,
      end: endAt,
      from: rangeFrom,
      to: rangeTo,
    });
    let startIndex = columns;
    if (isSameDay(endAt, rangeFrom)) startIndex = 0;
    else if (isSameDay(startAt, rangeTo)) startIndex = columns - 1;
    else if (case1 || case4) startIndex = 0;
    else if (render) startIndex = Math.min(getDateDiff(rangeFrom, startAt), columns);

    let length = 0;
    if (case1) length = getDateDiff(rangeFrom, endAt);
    else if (case2) length = getDateDiff(startAt, rangeTo);
    else if (case3) length = getDateDiff(startAt, endAt);
    else if (case4) length = getDateDiff(rangeFrom, rangeTo);

    const exceedsLeft = !isSameDay(startAt, rangeFrom) && isFormer(startAt, rangeFrom);
    const exceedsRight = !isSameDay(endAt, rangeTo) && isLatter(endAt, rangeTo);

    const filteredStories = filterStoriesAboutEpic(id, stories);
    return {
      index: startIndex,
      id,
      length,
      exceedsLeft,
      exceedsRight,
      status: getStatusFromStories(filteredStories),
    };
  });

export const getOrderMedian = (epics: EpicType[], targetOrder: number) => {
  const index = epics.findIndex((epic) => epic.order === targetOrder);
  if (index === 0) return targetOrder / 2;
  const result = epics[index === -1 ? epics.length - 1 : index - 1];
  return (targetOrder + result.order) / 2;
};
