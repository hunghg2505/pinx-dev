import React from 'react';

import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';

import { IWatchListItem, socket } from '@components/Home/service';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';

import styles from './index.module.scss';
import InterestItem from './InterestItem';

interface IProps {
  isEdit?: boolean;
  interestStock?: any;
  refreshInterest?: () => void;
  refreshYourWatchList?: () => void;
  totalStock: number;
}
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
};

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
  } = props;
  const { t } = useTranslation('watchlist');
  const { isDesktop, isMobile } = useResponsive();

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
              <Slider {...settings} className={classNames('', styles.slickSlider)} draggable>
                {dataFormat?.map((item: IWatchListItem, index: number) => {
                  const isChangeColor = isChangeStockPrice && findIndex === index;
                  return (
                    <div
                      key={`desktop-${index}`}
                      className='relative min-h-[172px] flex-none rounded-[12px] bg-[#f9f9f9] px-[14px] pb-[12px] pt-[16px]'
                    >
                      <InterestItem
                        totalStock={totalStock}
                        data={item}
                        refresh={refreshInterest}
                        refreshYourWatchList={refreshYourWatchList}
                        isChangeColor={isChangeColor}
                      />
                    </div>
                  );
                })}
              </Slider>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default Interest;
