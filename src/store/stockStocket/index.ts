import { atom } from 'jotai';

export enum StockSocketLocation {
  STOCK_DETAIL_PAGE = 'STOCK_DETAIL_PAGE',
  WATCH_LIST_COMPONENT = 'WATCH_LIST_COMPONENT',
}

interface IStockSocket {
  location: string;
  stocks: string[];
}

const initialStockSocket: IStockSocket[] = [];

export const stockSocketAtom = atom(initialStockSocket);
