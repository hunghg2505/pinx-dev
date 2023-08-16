import React from 'react';

import { useTranslation } from 'next-i18next';

import { requestJoinChannel, requestLeaveChannel, socket } from '@components/Home/service';
import { IStockTheme, IThemeDetail } from '@components/Themes/service';
import Text from '@components/UI/Text';

import ItemStock from './ItemStock';

const StockSymbols = ({ data }: { data: IThemeDetail }) => {
  const { t } = useTranslation('theme');
  const stockList = React.useMemo(() => {
    if (data?.stockList) {
      return [...data?.stockList];
    }
    return [];
  }, [data]);
  // const stockList = data?.stockList && [...data?.stockList];
  const [dataSocket, setDataSocket] = React.useState<any>({});
  React.useEffect(() => {
    if (stockList) {
      for (const element of stockList) {
        requestJoinChannel(element.stock_code);
      }
    }
    return () => {
      if (stockList) {
        for (const element of stockList) {
          requestLeaveChannel(element.stock_code);
        }
      }
    };
  }, []);
  socket.on('public', (message: any) => {
    const data = message.data;
    if (data?.id === 3220) {
      setDataSocket(data);
    }
  });
  const findIndex = stockList?.findIndex((item: any) => item.stock_code === dataSocket.sym);
  if (findIndex && findIndex !== -1) {
    const data = stockList[findIndex];
    stockList[findIndex] = {
      ...data,
      ...dataSocket,
    };
  }
  return (
    <>
      <Text
        type='body-20-semibold'
        color='neutral-black'
        className='mb-[16px] mt-[26px] block desktop:hidden'
      >
        {t('tab.stock_symbols')}
      </Text>
      <div className='flex flex-col gap-y-[16px] desktop:mt-[26px]'>
        {stockList?.map((item: IStockTheme, index: number) => {
          const isChangeStock = findIndex === index;
          return <ItemStock key={index} data={item} isChangeStock={isChangeStock} />;
        })}
      </div>
    </>
  );
};
export default StockSymbols;
