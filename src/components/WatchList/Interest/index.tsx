import React from 'react';

import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import { IWatchListItem } from '@components/Home/service';
import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import useSpildeOptions from '@hooks/useSplideOptions';
import { socket } from 'src/socket/socket';

import styles from './index.module.scss';
import InterestItem from './InterestItem';

interface IProps {
  isEdit?: boolean;
  interestStock?: any;
  refreshInterest?: () => void;
  refreshYourWatchList?: () => void;
  totalStock: number;
  onTrackingViewTickerInfo?: (stockCode: string, location: string) => void;
}

const Empty = dynamic(() => import('@components/UI/Empty'), {
  ssr: false,
});

const Interest = (props: IProps) => {
  const [dataSocket, setDataSocket] = React.useState<any>({});
  const {
    isEdit = false,
    interestStock,
    refreshInterest,
    refreshYourWatchList,
    totalStock,
    onTrackingViewTickerInfo,
  } = props;
  const { t } = useTranslation('watchlist');
  const { isDesktop, isMobile } = useResponsive();
  const { interestWatchlistSplideOptions } = useSpildeOptions();

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
  const { dataFormat, isChangeStockPrice, findIndex } = React.useMemo(() => {
    const findIndex = interestStock?.findIndex((item: any) => item.stockCode === dataSocket.sym);
    let isChangeStockPrice = false;
    if (interestStock && findIndex !== -1) {
      const data = interestStock[findIndex];
      isChangeStockPrice = data?.lastPrice !== dataSocket?.lastPrice;
      interestStock[findIndex] = {
        ...data,
        ...dataSocket,
      };
    }

    return { dataFormat: interestStock, isChangeStockPrice, findIndex };
  }, [interestStock, dataSocket]);
  return (
    <>
      {!isEdit && (
        <div className='flex flex-col gap-y-[16px]'>
          <Text type='body-20-bold' className='text-[#0D0D0D]'>
            {t('titleInterest')}
          </Text>
          {interestStock?.length < 1 && <Empty />}
          {isMobile && interestStock?.length > 0 && (
            <div
              className={classNames(
                'ml-[-16px] mr-[-16px] flex gap-x-[16px] overflow-x-auto pb-[16px] pr-[16px] desktop:ml-[-24px] desktop:mr-[-24px] desktop:pr-[24px]',
                styles.listInterest,
              )}
            >
              {dataFormat?.map((item: IWatchListItem, index: number) => {
                const isChangeColor = isChangeStockPrice && findIndex === index;
                return (
                  <div
                    key={`mobile-${index}`}
                    className='relative min-h-[172px] w-[112px] flex-none rounded-[12px] bg-[#f9f9f9] px-[14px] pb-[12px] pt-[16px] first:ml-[16px] desktop:first:ml-[24px]'
                  >
                    <InterestItem
                      onTrackingViewTickerInfo={onTrackingViewTickerInfo}
                      totalStock={totalStock}
                      data={item}
                      refresh={refreshInterest}
                      refreshYourWatchList={refreshYourWatchList}
                      isChangeColor={isChangeColor}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {isDesktop && interestStock?.length > 0 && (
            <>
              <SplideCustomWrap
                options={interestWatchlistSplideOptions}
                className={styles.interstSplide}
              >
                {dataFormat?.map((item: IWatchListItem, index: number) => {
                  const isChangeColor = isChangeStockPrice && findIndex === index;
                  return (
                    <SplideSlide key={`desktop-${index}`}>
                      <div className='relative min-h-[172px] flex-none rounded-[12px] bg-[#f9f9f9] px-[14px] pb-[12px] pt-[16px]'>
                        <InterestItem
                          onTrackingViewTickerInfo={onTrackingViewTickerInfo}
                          totalStock={totalStock}
                          data={item}
                          refresh={refreshInterest}
                          refreshYourWatchList={refreshYourWatchList}
                          isChangeColor={isChangeColor}
                        />
                      </div>
                    </SplideSlide>
                  );
                })}
              </SplideCustomWrap>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Interest;
