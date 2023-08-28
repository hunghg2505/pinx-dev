import { atom } from 'jotai';

export enum StockSocketLocation {
  STOCK_DETAIL_PAGE = 'STOCK_DETAIL_PAGE',
  WATCH_LIST_COMPONENT_LAYOUT = 'WATCH_LIST_COMPONENT_LAYOUT',
  WL_PAGE_INTEREST_COMPONENT = 'WL_PAGE_INTEREST_COMPONENT',
  WL_PAGE_WL_COMPONENT = 'WL_PAGE_WL_COMPONENT',
  COMPANY_RELATED_PAGE = 'COMPANY_RELATED_PAGE',
  STOCK_THEME_DETAIL_PAGE = 'STOCK_THEME_DETAIL_PAGE',
  WATCH_LIST_PROFILE_PAGE = 'WATCH_LIST_PROFILE_PAGE',
  WATCH_LIST_USER_DETAIL_PAGE = 'WATCH_LIST_USER_DETAIL_PAGE',
}

interface IStockSocket {
  location: string;
  stocks: string[];
}

const initialStockSocket: IStockSocket[] = [];

export const stockSocketAtom = atom(initialStockSocket);
