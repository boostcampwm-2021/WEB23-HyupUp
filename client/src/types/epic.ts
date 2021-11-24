export type EpicType = {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
  order: number;
};

export type EpicWithString = {
  id: number;
  name: string;
  startAt: string;
  endAt: string;
  order: number;
};

export const isEpicType = (param: {
  id: unknown;
  name: unknown;
  startAt: unknown;
  endAt: unknown;
  order: unknown;
}): param is EpicType => {
  return (
    typeof param.id === 'number' &&
    typeof param.name === 'string' &&
    param.startAt instanceof Date &&
    param.endAt instanceof Date &&
    typeof param.order === 'number'
  );
};

export type CalendarRange = {
  rangeFrom: Date;
  rangeTo: Date;
  columns: number;
};

export type EpicRenderInfo = {
  id: number;
  index: number;
  length: number;
  exceedsLeft: boolean;
  exceedsRight: boolean;
};
