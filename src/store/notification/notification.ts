import { atom } from 'jotai';

interface INotification {
  notiCount: number;
}

export const initialNotification: INotification = {
  notiCount: 0,
};

export const notificationAtom = atom({ ...initialNotification });
