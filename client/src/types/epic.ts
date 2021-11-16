export type EpicType = {
  id: number;
  name: string;
  startAt: Date;
  endAt: Date;
};

export type EpicWithString = {
  id: number;
  name: string;
  startAt: string;
  endAt: string;
};

export const isEpicType = (param: {
  id: unknown;
  name: unknown;
  startAt: unknown;
  endAt: unknown;
}): param is EpicType => {
  return (
    typeof param.id === 'number' &&
    typeof param.name === 'string' &&
    param.startAt instanceof Date &&
    param.endAt instanceof Date
  );
};
