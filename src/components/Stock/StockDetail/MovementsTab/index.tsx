import React, { memo } from 'react';

import dynamic from 'next/dynamic';

import { IStockData } from '@components/Stock/type';

import { FakeTableAskBid, FakeTablePrice1, FakeTablePrice2, FakeTotalPrice } from './Fake';

const TotalPrice = dynamic(() => import('@components/Stock/StockDetail/MovementsTab/TotalPrice'), {
  ssr: false,
  loading: () => <FakeTotalPrice />,
});

const TableAsk = dynamic(() => import('@components/Stock/StockDetail/MovementsTab/TableAsk'), {
  ssr: false,
  loading: () => <FakeTableAskBid isAsk />,
});

const TableBid = dynamic(() => import('@components/Stock/StockDetail/MovementsTab/TableBid'), {
  ssr: false,
  loading: () => <FakeTableAskBid />,
});

const TablePrice1 = dynamic(
  () => import('@components/Stock/StockDetail/MovementsTab/TablePrice1'),
  {
    ssr: false,
    loading: () => <FakeTablePrice1 />,
  },
);

const TablePrice2 = dynamic(
  () => import('@components/Stock/StockDetail/MovementsTab/TablePrice2'),
  {
    ssr: false,
    loading: () => <FakeTablePrice2 />,
  },
);

interface IMovementsTabProps {
  stockData?: IStockData;
  preDataStock?: IStockData;
}

export const getColor = (price: number, ref: number) => {
  if (price === ref) {
    return {
      color: '#F1BA09',
      backgroundColor: '#F4E7CD',
    };
  }

  if (price < ref) {
    return {
      color: '#DA314F',
      backgroundColor: '#F5E4E7',
    };
  }

  if (price > ref) {
    return {
      color: '#128F63',
      backgroundColor: '#B6DFD1',
    };
  }

  return {
    color: '#474D57',
    backgroundColor: '#CCCCCC',
  };
};

const MovementsTab = ({ stockData, preDataStock }: IMovementsTabProps) => {
  return (
    <>
      <div className='tablet:flex tablet:gap-x-[20px]'>
        <div className='flex flex-1 flex-col gap-y-[8px] tablet:gap-y-[20px]'>
          <TableAsk stockData={stockData} preDataStock={preDataStock} />

          <TableBid stockData={stockData} preDataStock={preDataStock} />
        </div>

        <div className='mt-[8px] flex gap-x-[20px] rounded-[12px] border-solid small-mobile-max:gap-x-[10px] tablet:mt-0 tablet:w-[220px] tablet:flex-col tablet:justify-between tablet:gap-y-[10px] tablet:border tablet:border-[#EBEBEB]'>
          <TablePrice1 stockData={stockData} />

          <div className='mx-[20px] hidden h-[1px] bg-[#ebebeb] tablet:block'></div>

          <TablePrice2 stockData={stockData} />
        </div>
      </div>

      <div className='mt-[20px]'>
        <TotalPrice stockData={stockData} preDataStock={preDataStock} />
      </div>
    </>
  );
};

export default memo(MovementsTab);
