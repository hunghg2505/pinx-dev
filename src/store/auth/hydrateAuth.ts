import { useEffect } from 'react';

import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { getAccessToken } from '@store/auth';

export const atomLogin = atom(false);

export const useHydrateLoginToAtom = (initialValue: boolean) => {
  useHydrateAtoms([[atomLogin, initialValue]]);
};

export const useLogin = () => {
  const [isLogin, setIsLogin] = useAtom(atomLogin);

  useEffect(() => {
    setIsLogin(!!getAccessToken());
  }, []);

  return {
    isLogin,
  };
};
