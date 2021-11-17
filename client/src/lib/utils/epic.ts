import { EpicType, EpicWithString } from '@/types/epic';

export const makeEpicWithDate = (epicWithString: EpicWithString): EpicType => {
  return {
    id: epicWithString.id,
    name: epicWithString.name,
    startAt: new Date(epicWithString.startAt),
    endAt: new Date(epicWithString.endAt),
  };
};
