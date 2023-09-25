import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { useSelectStock } from '@components/Auth/Register/CompanyStep/service';
import { IWatchListItem } from '@components/Home/service';
import Loading from '@components/UI/Loading';
import Text from '@components/UI/Text';
import { useStockWatchlistHome } from '@store/stockWatchlistHome/useStockWatchlistHome';
import { ROUTE_PATH, formatStringToNumber, imageStock } from '@utils/common';
import { addTickerTracking } from 'src/mixpanel/mixpanel';

import styles from './index.module.scss';

interface IProps {
  data: IWatchListItem;
  refresh?: () => void;
  refreshYourWatchList?: () => void;
  isChangeColor?: boolean;
  totalStock: number;
  onTrackingViewTickerInfo?: (stockCode: string, location: string) => void;
}
const InterestItem = (props: IProps) => {
  const {
    data,
    refresh,
    refreshYourWatchList,
    isChangeColor,
    totalStock,
    onTrackingViewTickerInfo,
  } = props;
  const highest_price = data?.refPrice;
  const lowest_price = data?.refPrice;
  const isFloor = data?.lastPrice === data?.floorPrice;
  const isHigh = data?.lastPrice === data?.ceilPrice;
  const isDecrease = data?.lastPrice < highest_price;
  const isIncrease = data?.lastPrice > lowest_price;
  const isChange = Number(data?.changePc) === 0 || Number(data?.perChange) === 0;
  const unit = isDecrease ? '-' : '+';

  const { getInitDataStockWatchlistHome } = useStockWatchlistHome();

  const requestSelectStock = useSelectStock({
    onSuccess: (_, params: [string]) => {
      refresh && refresh();
      refreshYourWatchList && refreshYourWatchList();
      getInitDataStockWatchlistHome();
      // toast(() => <Notification type='success' message='Add stock success1' />);

      // gtm
      addTickerTracking(
        params.length > 0 ? params[0] : '',
        'Stock',
        'Watchlist',
        'Default',
        totalStock + 1,
      );
    },
  });
  const onAddStock = () => {
    requestSelectStock.run(data?.stockCode);
  };
  return (
    <>
      <Link
        className='absolute inset-x-0 inset-y-0'
        href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}
        prefetch={false}
        onClick={() => {
          onTrackingViewTickerInfo && onTrackingViewTickerInfo(data?.stockCode, 'You may interest');
        }}
      />
      <div className='flex flex-col gap-y-[16px]'>
        <div className='m-auto flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-white object-contain'>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={imageStock(data?.stockCode)}
            alt=''
            className='block'
          />
        </div>
        <div className='flex flex-col gap-y-[8px] text-center'>
          <Text
            type='body-14-semibold'
            className={classNames('px-[5px] py-[2px]', {
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DA314F]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
              'text-[#22D1E9]': isFloor,
              'text-[#782AF9]': isHigh,
              'text-[#F1BA09]  ': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
              'text-[#474D57]': Number(data?.lastPrice) === 0,
              [styles.isIncrease]: isIncrease && !isHigh && !isChange && isChangeColor,
              [styles.isDecrease]:
                isDecrease &&
                !isFloor &&
                Number(data?.lastPrice) !== 0 &&
                !isChange &&
                isChangeColor,
            })}
          >
            {Number(data?.lastPrice) === 0 ? '-' : formatStringToNumber(data?.lastPrice, true, 2)}
          </Text>
          <Text type='body-14-regular' className='text-[#0D0D0D]'>
            {data?.stockCode}
          </Text>
          <div>
            <Text
              type='body-12-medium'
              className={classNames('ml-[-14px] mr-[-14px] whitespace-nowrap px-[5px] py-[2px]', {
                'text-[#128F63]': isIncrease && !isHigh,
                'text-[#DA314F]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
                'text-[#22D1E9]': isFloor,
                'text-[#782AF9]': isHigh,
                'text-[#F1BA09]  ': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
                'text-[#474D57]': Number(data?.lastPrice) === 0,
                [styles.isIncrease]: isIncrease && !isHigh && !isChange && isChangeColor,
                [styles.isDecrease]:
                  isDecrease &&
                  !isFloor &&
                  Number(data?.lastPrice) !== 0 &&
                  !isChange &&
                  isChangeColor,
              })}
            >
              {isChange ? '' : unit}
              {isChange ? '-' : formatStringToNumber(data?.change, true, 2)} /{' '}
              {isChange ? '' : unit}
              {isChange
                ? '-'
                : (data?.changePc && formatStringToNumber(data?.changePc, true, 2)) ||
                  formatStringToNumber(data?.perChange, true, 2)}
              %
            </Text>
            {requestSelectStock?.loading ? (
              <div className='absolute inset-x-0 inset-y-0 flex items-center justify-center backdrop-blur-sm'>
                <Loading />
              </div>
            ) : (
              <div
                className={classNames(
                  'absolute bottom-[-10px] left-1/2 z-50 flex h-[24px] w-[24px] translate-x-[-50%] cursor-pointer items-center justify-center rounded-full bg-[#fff]',
                  styles.heart,
                )}
                onClick={onAddStock}
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM8.41613 12.4677L11.9839 8.78387C13.0226 7.7129 12.9613 5.93871 11.8065 4.95161C10.7968 4.09032 9.29355 4.24516 8.36774 5.2L8.00323 5.57419L7.63871 5.2C6.7129 4.24516 5.20968 4.09032 4.2 4.95161C3.04194 5.93871 2.98065 7.7129 4.01613 8.78387L7.58065 12.4677C7.8129 12.7065 8.1871 12.7065 8.41613 12.4677Z'
                    fill='black'
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default InterestItem;
