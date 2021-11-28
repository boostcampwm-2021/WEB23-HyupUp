export type EpicType = {
  id: number;
  projectId: number;
  name: string;
  startAt: Date;
  endAt: Date;
  order: number;
};

export type EpicWithString = {
  id: number;
  projectId: number;
  name: string;
  startAt: string;
  endAt: string;
  order: number;
};

export const isEpicType = (param: {
  id: unknown;
  projectId: number;
  name: unknown;
  startAt: unknown;
  endAt: unknown;
  order: unknown;
}): param is EpicType => {
  return (
    typeof param.id === 'number' &&
    typeof param.projectId === 'number' &&
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

export type RoadmapBarsStatus = 'UNINITIALIZED' | 'NOT_STARTED' | 'STARTED' | 'ALL_DONE';

export type EpicRenderInfo = {
  id: number;
  index: number;
  length: number;
  exceedsLeft: boolean;
  exceedsRight: boolean;
  status: RoadmapBarsStatus;
};
