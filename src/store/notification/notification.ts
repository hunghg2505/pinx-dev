import { atom } from 'jotai';

export interface INotification {
  notiCount: number;
  refreshNotiData?: () => void;
  refreshPinetreeNotiData?: () => void;
  refreshNotiCount?: () => void;
}

export const initialNotification: INotification = {
  notiCount: 0,
};

export const notificationAtom = atom({ ...initialNotification });
