import { atom } from 'recoil';
import { EpicType } from '@/types/epic';

const epicListAtom = atom<EpicType[]>({
  key: 'epicListState',
  default: [],
});

export default epicListAtom;
