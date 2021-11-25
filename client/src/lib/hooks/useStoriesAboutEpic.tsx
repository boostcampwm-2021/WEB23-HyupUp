import { useStoryState } from './useContextHooks';

const TODO = 'TODO';
const IN_PROGRESS = 'IN_PROGRESS';
const DONE = 'DONE';

/**
 *
 * @returns 에픽 id를 전달하면 해당 에픽과 연동된 스토리를 상태별로 분류해서 반환해주는 함수
 */
const useStoriesAboutEpic = () => {
  const stories = useStoryState();
  return (epicId: number) => {
    const todos = stories.filter((story) => story.epicId === epicId && story.status === TODO);
    const inProgresses = stories.filter(
      (story) => story.epicId === epicId && story.status === IN_PROGRESS,
    );
    const dones = stories.filter((story) => story.epicId === epicId && story.status === DONE);
    return { todos, inProgresses, dones };
  };
};

export default useStoriesAboutEpic;
