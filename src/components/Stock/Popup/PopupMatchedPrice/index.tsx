import React, { useEffect, useRef, useState } from 'react';

// import { useInfiniteScroll } from 'ahooks';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { getColor } from '@components/Stock/StockDetail/MovementsTab';
import { IStockTrade } from '@components/Stock/type';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { formatNumber } from '@utils/common';

import styles from './index.module.scss';
// import { getLoadMoreList } from './service';

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
  const [popupWidth, setPopupWidth] = useState<number | undefined>();
  const ref = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const popupElement = document.querySelector(`.${POPUP_CLASS_NAME}`);
      const popupContentElm = popupElement?.querySelector('.rc-dialog-content');
      const popupClientWidth = popupContentElm?.clientWidth;

      popupClientWidth !== popupWidth && setPopupWidth(popupClientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [popupWidth]);

  // const { data } = useInfiniteScroll((d) => getLoadMoreList(d?.nextId, 20), {
  //   target: ref,
  //   isNoMore: (d) => !d?.nextId,
  // });

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      className={classNames(styles.popupMatchedPrice, POPUP_CLASS_NAME)}
    >
      <Text type='body-16-bold' color='primary-5' className='text-center'>
        {t('matched_price')}
      </Text>

      <table className='mt-[20px] text-right' style={{ width: `${popupWidth}px` }}>
        <thead className='table w-[calc(100%-1em)] table-fixed'>
          <tr className='bg-[#EBEBEB] text-right'>
            <th className='py-[5px] pl-[16px] text-left'>
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
            <th className='py-[5px] pr-[16px]'>
              <Text type='body-12-regular' color='primary-5'>
                +/-
              </Text>
            </th>
          </tr>
        </thead>

        <tbody className='block max-h-[calc(70vh-40px-44px)] overflow-auto' ref={ref}>
          {stockTrade?.data?.map((item, index) => (
            <tr key={index} className='table w-full table-fixed'>
              <td className='py-[10px] pl-[16px] text-left'>
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
                  {item.lastPrice}
                </Text>
              </td>
              <td className='py-[10px] pr-[16px]'>
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
        </tbody>
      </table>
    </Modal>
  );
};

export default PopupMatchedPrice;
