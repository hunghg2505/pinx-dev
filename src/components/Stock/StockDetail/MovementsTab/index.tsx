import React from 'react';

import dynamic from 'next/dynamic';

import { IStockData } from '@components/Stock/type';

import { FakeTableAskBid, FakeTablePrice1, FakeTablePrice2, FakeTotalPrice } from './Fake';

const TotalPrice = dynamic(() => import('@components/Stock/StockDetail/MovementsTab/TotalPrice'), {
  ssr: false,
  loading: () => <FakeTotalPrice />,
});

const TableAsk = dynamic(() => import('@components/Stock/StockDetail/MovementsTab/TableAsk'), {
  ssr: false,
  loading: () => <FakeTableAskBid />,
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
      <div className='tablet:hidden'>
        <div className='flex justify-between'>
          <div className='flex-1'>
            <TablePrice1 stockData={stockData} />
          </div>

          <TableAsk
            className='laptop-max:w-[49vw]'
            stockData={stockData}
            preDataStock={preDataStock}
          />
        </div>

        <div className='mt-[12px] flex justify-between'>
          <TableBid
            className='laptop-max:w-[49vw]'
            stockData={stockData}
            preDataStock={preDataStock}
          />

          <div className='flex-1'>
            <TablePrice2 stockData={stockData} />
          </div>
        </div>
      </div>

      <div className='hidden tablet:block'>
        <div className='grid grid-cols-2 gap-x-[16px]'>
          <TableBid stockData={stockData} preDataStock={preDataStock} />

          <TableAsk stockData={stockData} preDataStock={preDataStock} />
        </div>

        <div className='mt-[8px] grid grid-cols-2 gap-x-[16px]'>
          <TablePrice1 stockData={stockData} />

          <TablePrice2 stockData={stockData} />
        </div>
      </div>

      <div className='mt-[20px]'>
        <TotalPrice stockData={stockData} preDataStock={preDataStock} />
      </div>
    </>
  );
};

export default MovementsTab;
