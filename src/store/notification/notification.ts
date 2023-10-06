import { atom } from 'jotai';

interface INotification {
  notiCount: number;
  refreshNotiData: () => void;
  refreshPinetreeNotiData: () => void;
}

export const initialNotification: INotification = {
  notiCount: 0,
  refreshNotiData: () => {},
  refreshPinetreeNotiData: () => {},
};

export const notificationAtom = atom({ ...initialNotification });
