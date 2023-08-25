import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { IWatchListItem } from '@components/Home/service';
import CustomLink from '@components/UI/CustomLink';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber } from '@utils/common';

import style from './index.module.scss';

const ItemWatchList = ({
  data,
  isEdit,
  refresh,
  isChangeStock = false,
}: {
  data: IWatchListItem;
  isEdit: boolean;
  refresh: () => void;
  isChangeStock?: boolean;
}) => {
  const { i18n } = useTranslation();

  const highest_price = data?.refPrice;
  const lowest_price = data?.refPrice;
  const isFloor = data?.lastPrice === data?.floorPrice;
  const isHigh = data?.lastPrice === data?.ceilPrice;
  const isDecrease = data?.lastPrice < highest_price;
  const isIncrease = data?.lastPrice > lowest_price;
  const isChange = Number(data?.changePc) === 0 || Number(data?.changePercent) === 0;
  const unit = isDecrease ? '-' : '+';
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;

  const useRemoveStock = useRequest(
    () => {
      return privateRequest(requestPist.put, API_PATH.PRIVATE_REMOVE_STOCK(data?.stockCode));
    },
    {
      manual: true,
      onSuccess: () => {
        toast(() => <Notification type='success' message='Remove stock success' />);
        refresh && refresh();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e.error} />);
      },
    },
  );
  const onRemove = () => {
    useRemoveStock.run();
  };
  return (
    <>
      <div className={classNames('mr-[32px] flex flex-1 items-center gap-x-[10px]')}>
        <CustomLink className='flex-none' href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
          <div className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white object-contain galaxy-max:h-[30px] galaxy-max:w-[30px] tablet:h-[48px] tablet:w-[48px]'>
            <img src={url} alt='' className='block' />
          </div>
        </CustomLink>
        <div className='flex flex-1 flex-col gap-y-[4px]'>
          <div className='flex gap-x-[4px]'>
            <CustomLink href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
              <Text type='body-16-semibold' className='text-[#0D0D0D] galaxy-max:text-[14px]'>
                {data?.stockCode}
              </Text>
            </CustomLink>
            <Text
              type='body-10-regular'
              className='text-#394251 rounded-[4px] border-[1px] border-solid border-[#EBEBEB] bg-[#fff] px-[7px] py-[2px] leading-[16px]  galaxy-max:text-[8px]'
            >
              {data?.stockExchange}
            </Text>
          </div>
          <Text
            type='body-12-regular'
            className={classNames('line-clamp-2 galaxy-max:text-[10px]', {
              'max-w-[155px] text-[#474D57]': isEdit,
              'max-w-[155px] text-[#999] ': !isEdit,
            })}
          >
            {i18n.language === 'vi' ? data?.name : data?.nameEn}
          </Text>
        </div>
      </div>
      {isEdit ? (
        <div className='flex pr-[12px]'>
          <img
            loading='lazy'
            src='/static/icons/iconSwitch.svg'
            alt=''
            className='h-[21px] w-[20px]'
          />
          <img
            src='/static/icons/iconCloseBlue.svg'
            alt=''
            className='absolute -right-2 -top-2 h-[18px] w-[18px] cursor-pointer'
            onClick={onRemove}
          />
        </div>
      ) : (
        <div className='flex flex-col items-end gap-y-[5px]'>
          <Text
            type='body-14-semibold'
            className={classNames('px-[5px] py-[2px] galaxy-max:text-[12px]', {
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DA314F]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
              'text-[#22D1E9]': isFloor,
              'text-[#782AF9]': isHigh,
              'text-[#F1BA09] ': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
              'text-[#474D57]': Number(data?.lastPrice) === 0,
              [style.isIncrease]: isIncrease && !isHigh && isChangeStock && !isChange,
              [style.isDecrease]:
                isDecrease &&
                !isFloor &&
                Number(data?.lastPrice) !== 0 &&
                isChangeStock &&
                !isChange,
            })}
          >
            {Number(data?.lastPrice) === 0 ? '-' : formatStringToNumber(data?.lastPrice, true, 2)}
          </Text>
          <Text
            type='body-12-medium'
            className={classNames('px-[5px] py-[2px] galaxy-max:text-[10px]', {
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DA314F]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
              'text-[#22D1E9]': isFloor,
              'text-[#782AF9]': isHigh,
              'text-[#F1BA09]  ': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
              'text-[#474D57]': Number(data?.lastPrice) === 0,
              [style.isIncrease]: isIncrease && !isHigh && isChangeStock && !isChange,
              [style.isDecrease]:
                isDecrease &&
                !isFloor &&
                Number(data?.lastPrice) !== 0 &&
                isChangeStock &&
                !isChange,
            })}
          >
            {isChange ? '' : unit}
            {Number(data?.change) === 0 ? '-' : formatStringToNumber(data?.change, true, 2)} /{' '}
            {isChange ? '' : unit}
            {isChange
              ? '-'
              : (data?.changePc && formatStringToNumber(data?.changePc, true, 2)) ||
                formatStringToNumber(data?.changePercent, true, 2)}
            %
          </Text>
        </div>
      )}
    </>
  );
};
export default ItemWatchList;
