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
    .map((day) => (day >= lastDate ? day - lastDate : day))
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
