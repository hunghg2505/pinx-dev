import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';

import { requestJoinIndex, requestLeaveIndex } from '@components/Home/service';
import LoadCompVisible from '@components/LoadCompVisible/LoadCompVisible';
import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import { useGetDataStockHome } from '@store/stockMarketHome/useGetDataStockHome';
import { formatStringToNumber } from '@utils/common';

import MarketChartIframe from './ChartIframe';
import styles from './index.module.scss';
import PopupZoomChart from './PopupZoomChart';

const MarketDesktop = () => {
  const { t } = useTranslation('common');
  const { dataStockIndex, findIndex } = useGetDataStockHome();
  const [chartData, setChartData] = useState<{
    mc: string;
    oIndex: number;
  }>({
    mc: '',
    oIndex: 0,
  });
  const [popupVisible, setPopupVisible] = useState(false);

  const handelOpenPopup = (mc: string, oIndex: number) => {
    setChartData({
      mc,
      oIndex,
    });
    setPopupVisible(true);
  };

  useEffect(() => {
    requestJoinIndex();

    return () => {
      requestLeaveIndex();
    };
  }, []);

  if (!dataStockIndex?.length) {
    return (
      <>
        <div className='mb-[25px]  min-h-[536px] w-full rounded-[8px] bg-[#fff]  px-[20px] py-[30px]  [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <Text element='h4' type='body-16-bold' color='cbblack' className='mb-[25px]'>
            {t('market')}
          </Text>

          <Skeleton
            rows={3}
            wrapClassName='!flex-row gap-x-[12px] mb-[20px]'
            className='!w-full'
            round
          />
          <Skeleton
            rows={3}
            wrapClassName='!flex-row gap-x-[12px] mb-[40px]'
            className='!w-full'
            round
          />

          <Skeleton height={350} className='!w-full !rounded-[9px]' />
        </div>
      </>
    );
  }

  return (
    <LoadCompVisible>
      <div className='box-shadow card-style mb-[25px] rounded-[8px] bg-[#FFFFFF] p-[20px] pt-[30px]'>
        <Text element='h4' type='body-16-bold' color='cbblack' className='mb-[25px]'>
          {t('market')}
        </Text>
        <Tabs defaultActiveKey='1' className='tabHomePc'>
          {dataStockIndex?.map((item: any, index: number) => {
            const [change, changePercent] = item.ot.split('|');
            const isIncrease = item?.cIndex > item?.oIndex;
            const isDecrease = item?.cIndex < item?.oIndex;
            const isNoChange = item?.cIndex === item?.oIndex;
            const isChange = findIndex === index;
            const valueIndex = item.value / 1000;

            let unit;
            if (isNoChange) {
              unit = '';
            } else if (isIncrease) {
              unit = '+';
            } else {
              unit = '-';
            }
            return (
              <TabPane tab={item.displayName} key={index + 1}>
                <div className='mt-[20px]'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Text
                        type='body-14-semibold'
                        className={classNames('px-[5px] py-[2px]', {
                          'text-[#128F63]': isIncrease,
                          'text-[#DB4444]': isDecrease,
                          'text-[#E6A70A]': isNoChange,
                          [styles.isDecrease]: isDecrease && isChange,
                          [styles.isIncrease]: isIncrease && isChange,
                          [styles.isNoChange]: isNoChange && isChange,
                        })}
                      >
                        {formatStringToNumber(item?.cIndex) || 0}
                      </Text>
                      <Text
                        type='body-12-medium'
                        className={classNames('mt-[2px] px-[5px] py-[2px]', {
                          'text-[#128F63]': isIncrease,
                          'text-[#DB4444]': isDecrease,
                          'text-[#E6A70A]': isNoChange,
                          [styles.isDecrease]: isDecrease && isChange,
                          [styles.isIncrease]: isIncrease && isChange,
                          [styles.isNoChange]: isNoChange && isChange,
                        })}
                      >
                        {unit}
                        {item?.change || change} / {unit}
                        {item?.changePercent || changePercent}
                      </Text>
                    </div>
                    <div className='flex'>
                      <div className='mr-[35px] text-right'>
                        <Text type='body-12-regular' className='text-[#78909C]'>
                          {t('val')}
                        </Text>
                        <Text type='body-13-semibold' className='mt-[6px] text-[#263238] '>
                          {`${valueIndex.toLocaleString('en-US')}`} {t('bil')}
                        </Text>
                      </div>
                      <div className='text-right'>
                        <Text type='body-12-regular' className=' text-[#78909C]'>
                          {t('vol')}
                        </Text>
                        <Text type='body-13-semibold' className='mt-[6px] text-[#263238]'>
                          {item.vol.toLocaleString('en-US')}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className='relative mt-[12px] pt-[36px]'>
                    {/* icon maximize */}
                    <div
                      onClick={() => handelOpenPopup(item.mc, item.oIndex)}
                      className='absolute right-[22px] top-[8px] flex cursor-pointer items-center justify-center'
                    >
                      <img
                        src='/static/icons/icon_maximize.svg'
                        alt='Icon maximize'
                        className='h-[18px] w-[18px] object-contain'
                        loading='lazy'
                      />
                    </div>

                    <MarketChartIframe mc={item.mc} oIndex={item.oIndex} />
                  </div>
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>

      <PopupZoomChart
        visible={popupVisible}
        onClose={() => {
          setPopupVisible(false);
        }}
        mc={chartData?.mc}
        oIndex={chartData?.oIndex}
      />
    </LoadCompVisible>
  );
};
export default MarketDesktop;
