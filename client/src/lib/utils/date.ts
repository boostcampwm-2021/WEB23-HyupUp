import { EpicType, EpicWithString } from '@/types/epic';

export const makeEpicWithDate = (epicWithString: EpicWithString): EpicType => {
  return {
    id: epicWithString.id,
    name: epicWithString.name,
    startAt: new Date(epicWithString.startAt),
    endAt: new Date(epicWithString.endAt),
  };
};

export const getYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return { year, month, day };
};
