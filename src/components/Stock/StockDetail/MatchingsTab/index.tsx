import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';

import EmptyData from '@components/Stock/EmptyData';
import PopupMatchedPrice from '@components/Stock/Popup/PopupMatchedPrice';
import { useGetStockTrade } from '@components/Stock/service';
import Loading from '@components/UI/Loading';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';
import { AnalyzeTicker } from '@utils/dataLayer';

import { getColor } from '../MovementsTab';

interface IMatchingsTabProps {
  stockCode: string;
  stockRefPrice: number;
}

const LIMIT_STOCK_TRADE = 10;

const MatchingsTab = ({ stockCode, stockRefPrice }: IMatchingsTabProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const [openPopup, setOpenPopup] = useState(false);

  const { stockTrade, loading } = useGetStockTrade(stockCode);

  return (
    <>
      {loading ? (
        <Loading className='mx-auto' />
      ) : (
        <table className='w-full text-right'>
          <thead>
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

          <tbody>
            {stockTrade?.data &&
              stockTrade?.data.length > 0 &&
              stockTrade?.data.slice(0, LIMIT_STOCK_TRADE).map((item, index) => (
                <tr key={index}>
                  <td className='py-[10px] pl-[16px] text-left small-mobile-max:pl-[4px]'>
                    <Text type='body-16-regular' className='text-[#999999]'>
                      {item.time}
                    </Text>
                  </td>
                  <td className='py-[10px]'>
                    <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                      {formatStringToNumber(item.lastVol * 10) || 0}
                    </Text>
                  </td>
                  <td className='py-[10px]'>
                    <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                      {formatStringToNumber(item.lastPrice, true, 2) || 0}
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

            {(!stockTrade?.data || stockTrade.data.length === 0) && (
              <tr>
                <td className='pt-[12px]' colSpan={4}>
                  <EmptyData
                    titleClassName='text-[14px]'
                    title={t('matchings.empty_title')}
                    description={t('matchings.empty_description')}
                  />
                </td>
              </tr>
            )}
          </tbody>

          {stockTrade?.data && stockTrade.data.length >= LIMIT_STOCK_TRADE && (
            <tfoot>
              <tr>
                <td colSpan={4} onClick={() => AnalyzeTicker(stockCode, 'Matching', 'price')}>
                  <Text
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                    className='mt-[8px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'
                  >
                    <Text type='body-14-bold' color='primary-2' className='uppercase'>
                      {t('common:view_more')}
                    </Text>
                  </Text>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      )}

      {stockTrade?.data && stockTrade.data.length > 0 && (
        <PopupMatchedPrice
          stockTrade={stockTrade}
          visible={openPopup}
          onClose={() => setOpenPopup(false)}
          stockRefPrice={stockRefPrice}
        />
      )}
    </>
  );
};

export default MatchingsTab;
