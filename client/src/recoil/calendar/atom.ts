import { addDate } from '@/lib/utils/date';
import { atom } from 'recoil';

export const WEEK_OFFSET = 14;

const calendarAtom = atom<{ middle: Date; rangeFrom: Date; rangeTo: Date }>({
  key: 'atom/calendar',
  default: {
    middle: new Date(),
    rangeFrom: addDate(new Date(), (-1 * WEEK_OFFSET) / 2),
    rangeTo: addDate(new Date(), WEEK_OFFSET / 2),
  },
});

export default calendarAtom;
