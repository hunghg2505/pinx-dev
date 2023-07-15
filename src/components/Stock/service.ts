import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestMarket } from '@api/request';

import { IResponseShareholder, IResponseStockDetail } from './type';

const useStockDetail = (stockCode: string): IResponseStockDetail => {
  const { data } = useRequest(() => requestMarket.get(API_PATH.PUBLIC_COMPANY_DETAIL(stockCode)), {
    refreshDeps: [stockCode],
  });

  return {
    stockDetail: data,
  };
};

const useShareholder = (stockCode: string): IResponseShareholder => {
  const { data } = useRequest(
    () =>
      requestMarket.get(API_PATH.PUBLIC_COMPANY_SHAREHOLDER, {
        params: {
          stockCode,
        },
      }),
    {
      refreshDeps: [stockCode],
    },
  );

  return {
    shareholder: data,
  };
};

export { useStockDetail, useShareholder };
