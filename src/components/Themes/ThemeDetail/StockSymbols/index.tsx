import React from 'react';

import { useUnmount } from 'ahooks';
import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import { requestJoinChannel, requestLeaveChannel } from '@components/Home/service';
import { IStockTheme, IThemeDetail } from '@components/Themes/service';
import Text from '@components/UI/Text';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { socket } from 'src/socket/socket';

import ItemStock from './ItemStock';

const StockSymbols = ({ data }: { data: IThemeDetail }) => {
  const { t } = useTranslation('theme');
  const [stockSocket, setStockSocket] = useAtom(stockSocketAtom);

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
      const listStockCodes: string[] = [];
      for (const element of stockList) {
        requestJoinChannel(element.stock_code);
        listStockCodes.push(element.stock_code);
      }

      const findStock = stockSocket.find(
        (item) => item.location === StockSocketLocation.STOCK_THEME_DETAIL_PAGE,
      );
      const dataStock = {
        location: StockSocketLocation.STOCK_THEME_DETAIL_PAGE,
        stocks: listStockCodes,
      };
      if (findStock) {
        setStockSocket((prev) =>
          prev.map((item) => (item.location === findStock.location ? dataStock : item)),
        );
      } else {
        setStockSocket((prev) => [...prev, dataStock]);
      }
    }
  }, [stockList]);

  useUnmount(() => {
    if (stockList) {
      const listStockCodes = stockList.map((item) => item.stock_code);
      const stockNotJoinSocketChannel = listStockCodes.filter((item) => {
        return stockSocket.some((v) => !v.stocks.includes(item));
      });

      requestLeaveChannel(stockNotJoinSocketChannel.toString());
      setStockSocket((prev) =>
        prev.filter((item) => item.location !== StockSocketLocation.STOCK_THEME_DETAIL_PAGE),
      );
    }
  });

  React.useEffect(() => {
    const getDataSocket = (message: any) => {
      const data = message.data;
      if (data?.id === 3220) {
        setDataSocket(data);
      }
    };
    socket.on('public', getDataSocket);
    return () => {
      socket.off('public', getDataSocket);
    };
  }, []);

  const findIndex = stockList?.findIndex((item: any) => item.stock_code === dataSocket.sym);
  if (stockList && findIndex !== -1) {
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
