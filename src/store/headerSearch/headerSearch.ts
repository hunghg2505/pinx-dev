import { atom, useAtom } from 'jotai';

export const atomHeaderSearch = atom(true);

export const useHeaderSearch = () => {
  return useAtom(atomHeaderSearch);
};
