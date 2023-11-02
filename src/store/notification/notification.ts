import { atom } from 'jotai';

export interface INotification {
  notiCount: number;
  refreshNotiData?: () => void;
  refreshPinetreeNotiData?: () => void;
  refreshNotiCount?: () => void;
  pinetreeNoti?: any[];
  userNoti?: any[];
  defaultNotiTab: string;
}

export const initialNotification: INotification = {
  notiCount: 0,
  defaultNotiTab: 'userNoti',
};

export const notificationAtom = atom({ ...initialNotification });
