import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';

import PopupMatchedPrice from '@components/Stock/Popup/PopupMatchedPrice';
import { useGetStockTrade } from '@components/Stock/service';
import Text from '@components/UI/Text';

interface IMatchingsTabProps {
  stockCode: string;
}

const LIMIT_STOCK_TRADE = 20;

const MatchingsTab = ({ stockCode }: IMatchingsTabProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const [openPopup, setOpenPopup] = useState(false);

  const { stockTrade } = useGetStockTrade(stockCode);

  return (
    <>
      <table className='w-full text-right'>
        <thead>
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

        <tbody>
          {stockTrade?.data.map((item, index) => (
            <tr key={index}>
              <td className='py-[10px] pl-[16px] text-left'>
                <Text type='body-16-regular' className='text-[#999999]'>
                  {item.time}
                </Text>
              </td>
              <td className='py-[10px]'>
                <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                  {item.totalVol}
                </Text>
              </td>
              <td className='py-[10px]'>
                <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                  {item.lastPrice}
                </Text>
              </td>
              <td className='py-[10px] pr-[16px]'>
                <div className='inline-flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
                  <Text type='body-16-semibold' color='cbwhite'>
                    {item.change}
                  </Text>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        {stockTrade?.data && stockTrade.data.length >= LIMIT_STOCK_TRADE && (
          <tfoot>
            <tr>
              <td colSpan={4} className='pt-[24px]'>
                <Text
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                  type='body-14-medium'
                  className='cursor-pointer text-center uppercase text-[#3449D7] tablet:hidden'
                >
                  {t('common:view_more')}
                </Text>

                <div className='hidden tablet:block'>
                  <button
                    onClick={() => {
                      setOpenPopup(true);
                    }}
                    className='mt-[8px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'
                  >
                    <Text type='body-14-bold' color='primary-2' className='uppercase'>
                      {t('common:view_more')}
                    </Text>
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      <PopupMatchedPrice visible={openPopup} onClose={() => setOpenPopup(false)} />
    </>
  );
};

export default MatchingsTab;
