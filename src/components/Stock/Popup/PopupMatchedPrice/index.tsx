import React, { useRef } from 'react';

import { useInfiniteScroll } from 'ahooks';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { getColor } from '@components/Stock/StockDetail/MovementsTab';
import { IStockTrade } from '@components/Stock/type';
import Loading from '@components/UI/Loading';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { formatNumber, formatStringToNumber } from '@utils/common';

import styles from './index.module.scss';
import { getLoadMoreList } from './service';

interface IPopupMatchedPriceProps {
  visible: boolean;
  onClose: () => void;
  stockTrade?: {
    data: IStockTrade[];
  };
  stockRefPrice: number;
}

const POPUP_CLASS_NAME = 'popup-matched-price';

const PopupMatchedPrice = ({
  visible,
  onClose,
  stockTrade,
  stockRefPrice,
}: IPopupMatchedPriceProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const ref = useRef<HTMLTableSectionElement>(null);

  const { data, noMore, loadingMore } = useInfiniteScroll(
    (d) => getLoadMoreList(stockTrade?.data || [], d?.nextId, 30),
    {
      target: ref,
      isNoMore: (d) => !d?.nextId,
    },
  );

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      className={classNames(styles.popupMatchedPrice, POPUP_CLASS_NAME)}
    >
      <Text type='body-16-bold' color='primary-5' className='text-center'>
        {t('matched_price')}
      </Text>

      <table className='mt-[20px] text-right'>
        <thead className='table w-[calc(100%-0.5em)] table-fixed'>
          <tr className='bg-[#EBEBEB] text-right'>
            <th className='py-[5px] pl-[16px] text-left small-mobile-max:pl-[4px]'>
              <Text type='body-12-regular' color='primary-5'>
                {t('matchings.time')}
              </Text>
            </th>
            <th className='py-[5px]'>
              <Text type='body-12-regular' color='primary-5'>
                {t('matchings.vol')}
              </Text>
            </th>
            <th className='py-[5px]'>
              <Text type='body-12-regular' color='primary-5'>
                {t('matchings.price')}
              </Text>
            </th>
            <th className='py-[5px] pr-[16px] small-mobile-max:pr-[4px]'>
              <Text type='body-12-regular' color='primary-5'>
                +/-
              </Text>
            </th>
          </tr>
        </thead>

        <tbody className='block max-h-[calc(70vh-40px-44px)] overflow-auto' ref={ref}>
          {data?.list.map((item, index) => (
            <tr key={index} className='table w-full table-fixed'>
              <td className='py-[10px] pl-[16px] text-left small-mobile-max:pl-[4px]'>
                <Text type='body-16-regular' className='text-[#999999]'>
                  {item.time}
                </Text>
              </td>
              <td className='py-[10px]'>
                <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                  {formatNumber(item.lastVol * 10)}
                </Text>
              </td>
              <td className='py-[10px]'>
                <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                  {formatStringToNumber(item.lastPrice, true, 2)}
                </Text>
              </td>
              <td className='py-[10px] pr-[16px] small-mobile-max:pr-[4px]'>
                <div
                  className='inline-flex h-[21px] items-center justify-end rounded-[4px] pl-[15px] pr-[4px]'
                  style={{
                    backgroundColor: getColor(item.lastPrice, stockRefPrice)?.color,
                  }}
                >
                  <Text type='body-16-semibold' color='cbwhite'>
                    {item.change}
                  </Text>
                </div>
              </td>
            </tr>
          ))}

          {!noMore && loadingMore && <Loading className='mx-auto' />}
        </tbody>
      </table>
    </Modal>
  );
};

export default PopupMatchedPrice;
