import { DefaultValue, selectorFamily } from 'recoil';
import produce from 'immer';
import epicListAtom from '.';
import { EpicType } from '@/types/epic';

type EpicUpdateType = {
  name: string;
  startAt: Date;
  endAt: Date;
};

export const epicUpdateSelector = selectorFamily<EpicUpdateType | EpicType, number>({
  key: 'epicScheduleState',
  get:
    (id) =>
    ({ get }) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return get(epicListAtom).find((epic) => epic.id === id)!;
    },
  set:
    (id: number) =>
    ({ get, set }, newValue) => {
      set(
        epicListAtom,
        newValue instanceof DefaultValue
          ? get(epicListAtom)
          : (prev) =>
              produce(prev, (draft) => {
                const epicToUpdate = draft.find((item) => item.id === id);
                if (!epicToUpdate || !newValue) return;
                epicToUpdate.name = newValue.name;
                epicToUpdate.startAt = newValue.startAt;
                epicToUpdate.endAt = newValue.endAt;
              }),
      );
    },
});
