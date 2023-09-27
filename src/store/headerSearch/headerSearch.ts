import { atom, useAtom } from 'jotai';

export const atomHeaderSearch = atom(true);

export const useHeaderSearch = () => {
  return useAtom(atomHeaderSearch);
};

export const atomOpenSearch = atom(false);
export const useOpenSearch = () => useAtom(atomOpenSearch);
