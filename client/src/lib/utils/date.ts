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

export const isLeapYear = (year: number) => {
  return year % 4 === 0 && year % 100 !== 0;
};

export const getLastDate = ({ year, month }: { year: number; month: number }) => {
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28;
    case 4 | 6 | 9 | 11:
      return 30;
    default:
      return 31;
  }
};
