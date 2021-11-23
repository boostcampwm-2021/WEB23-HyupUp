const FRONT_HALF = 8;
const REAR_HALF = 7;

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
    case 1:
      return isLeapYear(year) ? 29 : 28;
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
    default:
      return 31;
  }
};

export const makeDayRow = (date: Date) => {
  const { year, month } = getYMD(date);
  const lastDate = getLastDate({ year, month });
  const formerLastDate = getLastDate({ year, month: month - 1 });
  const daysArray = new Array<number>();
  [...Array(FRONT_HALF)]
    .map((_, i) => date.getDate() - i)
    .map((day) => (day < 1 ? formerLastDate + day : day))
    .reverse()
    .forEach((day: number) => daysArray.push(day));
  [...Array(REAR_HALF)]
    .map((_, i) => date.getDate() + i + 1)
    .map((day) => (day > lastDate ? day - lastDate : day))
    .forEach((day: number) => daysArray.push(day));
  return daysArray;
};

export const getRangeFromDate = (date: Date) => {
  const { year, month, day } = getYMD(date);
  return {
    from: new Date(year, month, day - FRONT_HALF + 1),
    to: new Date(year, month, day + REAR_HALF),
  };
};

const dateFormat = { year: 'numeric' as const, month: '2-digit' as const, day: '2-digit' as const };

/**
 *
 * @param target date 보다 앞에있거나 같은지 확인할 date 객체
 * @param date 확인의 기준이 되는 date 객체
 */
export const isFormer = (target: Date, date: Date): boolean => {
  const targetString = target.toLocaleString('ko-kr', dateFormat);
  const dateString = date.toLocaleString('ko-kr', dateFormat);
  return targetString <= dateString;
};

/**
 *
 * @param target date 보다 뒤에있거나 같은지 확인할 date 객체
 * @param date 확인의 기준이 되는 date 객체
 */
export const isLatter = (target: Date, date: Date): boolean => {
  const targetString = target.toLocaleString('ko-kr', dateFormat);
  const dateString = date.toLocaleString('ko-kr', dateFormat);
  return targetString >= dateString;
};

/**
 *
 * @param target date 와 같은 날짜인지 확인할 date 객체
 * @param date 확인의 기준이 되는 date 객체
 */
export const isSameDay = (target: Date, date: Date) => {
  const targetString = target.toLocaleString('ko-kr', dateFormat);
  const dateString = date.toLocaleString('ko-kr', dateFormat);
  return targetString === dateString;
};

/**
 *
 * @param param.start 범위 내에 있는지 확인할 범위의 왼쪽 끝에 해당하는 날짜의 date 객체
 * @param param.end 범위 내에 있는지 확인할 범위의 오른쪽 끝에 해당하는 날짜의 date 객체
 * @param param.from 확인할 범위의 왼쪽 끝에 해당하는 날짜의 date 객체
 * @param param.to 확인할 범위의 오른쪽 끝에 해당하는 날짜의 date 객체
 * @return start - end 범위가 from - to 범위와 겹치는 부분이 있다면 true, 아니라면 false 를 반환
 */
export const shouldRender = ({
  start,
  end,
  from,
  to,
}: {
  start: Date;
  end: Date;
  from: Date;
  to: Date;
}) => {
  if (isFormer(end, from)) return false;
  else if (isLatter(start, to)) return false;
  return true;
};

export const getDateDiff = (target: Date, date: Date) => {
  const diffAbs = Math.abs(date.getTime() - target.getTime());
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diffAbs / oneDay);
};

/**
 *
 * @param date offset만큼 이동시킬 기준 날짜의 date 객체
 * @param offset 더할 일자 수에 해당하는 숫자
 * @return offset에 해당하는만큼 일자를 더한 date 객체
 */
export const addDate = (date: Date, offset: number) => {
  const { year, month, day } = getYMD(date);
  return new Date(year, month, day + offset);
};
