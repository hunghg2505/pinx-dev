import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import LoadCompVisible from '@components/LoadCompVisible/LoadCompVisible';
import Text from '@components/UI/Text';
import { useGetDataStockWatchlistHome } from '@store/stockWatchlistHome/useGetDataStockWatchlistHome';
import { useStockWatchlistHome } from '@store/stockWatchlistHome/useStockWatchlistHome';
import { REGISTER_COMPANY } from 'src/constant/route';

import ItemStock from './ItemStock';
import { IWatchListItem } from '../service';

const WatchList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { dataStockWatchlist, findIndex, isChangeStockPrice } = useGetDataStockWatchlistHome();
  const { removePublicEventListener } = useStockWatchlistHome();

  React.useEffect(() => {
    return () => {
      removePublicEventListener();
    };
  }, []);

  const onAddStock = () => {
    router.push(REGISTER_COMPANY);
  };
  return (
    <LoadCompVisible>
      <div className='mt-[22px] h-[179px] justify-center overflow-hidden mobile:block tablet:hidden'>
        {dataStockWatchlist?.length > 0 ? (
          <div className='no-scrollbar flex overflow-x-auto'>
            {dataStockWatchlist?.slice(0, 5).map((item: IWatchListItem, index: number) => {
              const isChangeStock = isChangeStockPrice && index === findIndex;
              return <ItemStock key={index} data={item} isChangeStock={isChangeStock} />;
            })}
          </div>
        ) : (
          <div
            className='mx-[auto] flex h-[160px] w-[104px] flex-col items-center rounded-[12px] border-[1px] border-dashed border-[#589DC0] bg-[#FFF] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'
            onClick={onAddStock}
          >
            <img
              src='/static/icons/iconAddStock.svg'
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='mb-[24px] mt-[48px] h-[38px] w-[38px]'
            />
            <Text type='body-14-bold' color='primary-1' className='text-center'>
              {t('add_favorite_stock')}
            </Text>
          </div>
        )}
      </div>
    </LoadCompVisible>
  );
};
export default WatchList;
