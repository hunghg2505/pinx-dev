import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import EmptyData from '@components/Stock/EmptyData';
import { useGetStockIntraday } from '@components/Stock/service';
import { IStockData } from '@components/Stock/type';
import Loading from '@components/UI/Loading';
import Text from '@components/UI/Text';
import { formatStringToNumber, kFormatter } from '@utils/common';

import { getColor } from '../MovementsTab';

const IntradayTab = ({ stockCode, stockData }: { stockCode: string; stockData?: IStockData }) => {
  const { t } = useTranslation(['stock', 'common']);

  const { stockIntraday, loading } = useGetStockIntraday(stockCode);

  const maxIntraday = useMemo(() => {
    if (stockIntraday?.data) {
      const max = Math.max(...stockIntraday?.data.map((item) => item.total));
      return max;
    }

    return 0;
  }, [stockIntraday]);

  return (
    <>
      {loading ? (
        <Loading className='mx-auto' />
      ) : (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr>
              <th className='border-y border-solid border-[#ccc] '>
                <Text type='body-12-regular' color='primary-5' className='bg-[#EBEBEB] py-[6px]'>
                  {t('intraday.price')}
                </Text>
              </th>
              <th className='border border-solid border-[#ccc] '>
                <Text type='body-12-regular' color='primary-5' className='bg-[#EBEBEB] py-[6px]'>
                  {t('intraday.total_volume')}
                </Text>
              </th>
              <th className='border-y border-solid border-[#ccc] '>
                <Text type='body-12-regular' color='primary-5' className='bg-[#EBEBEB] py-[6px]'>
                  {t('intraday.range')}
                </Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {stockIntraday?.data && stockIntraday.data.length > 0 && (
              <>
                <tr>
                  <td className='py-[16px] align-middle'>
                    <div className='h-[2px] bg-[#782AF9]'></div>
                  </td>

                  <td className='border-x border-solid border-[#ccc] align-middle'>
                    <div className='h-[2px] bg-[#782AF9]'></div>
                  </td>

                  <td className='align-middle'>
                    <div className='flex items-center'>
                      <div className='h-[2px] w-1/2 bg-[#782AF9]'></div>
                      <div className='flex h-[16px] -translate-x-1/4 items-center justify-center rounded-[4px] bg-[#782AF9] px-[4px]'>
                        <Text type='body-12-regular' color='cbwhite'>
                          {stockData?.c}
                        </Text>
                      </div>
                    </div>
                  </td>
                </tr>

                {stockIntraday?.data.map((item, index) => (
                  <tr key={index}>
                    <td
                      className={classNames('px-[6px] py-[8px] align-middle', {
                        'relative after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[2px] after:-translate-y-1/2 after:bg-[#EAA100] after:content-[""]':
                          item.price === stockData?.r,
                      })}
                    >
                      <Text
                        type='body-16-semibold'
                        className='relative z-10 text-right text-[#0D0D0D]'
                      >
                        {formatStringToNumber(item.price, true, 2)}
                      </Text>
                    </td>

                    <td
                      className={classNames(
                        'w-3/4 border-x border-solid border-[#ccc] align-middle',
                        {
                          'relative after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[2px] after:-translate-y-1/2 after:bg-[#EAA100] after:content-[""]':
                            item.price === stockData?.r,
                        },
                      )}
                    >
                      <div className='flex items-center'>
                        <div
                          className='z-10 h-[21px] rounded-br-[4px] rounded-tr-[4px]'
                          style={{
                            backgroundColor: getColor(item.price, stockData?.r || 0)?.color,
                            width: (item.total / maxIntraday) * 100 + '%',
                          }}
                        ></div>

                        <Text type='body-12-semibold' className='z-10 mx-[8px]'>
                          {kFormatter(item.total * 10)}
                        </Text>
                      </div>
                    </td>

                    <td className='align-middle'>
                      {item.price === stockData?.r && (
                        <div className='flex items-center'>
                          <div
                            className='h-[2px] w-1/2'
                            style={{
                              backgroundColor: getColor(item.price, stockData?.r || 0)?.color,
                            }}
                          ></div>
                          <div
                            className='flex h-[16px] -translate-x-1/4 items-center justify-center rounded-[4px] px-[4px]'
                            style={{
                              backgroundColor: getColor(item.price, stockData?.r || 0)?.color,
                            }}
                          >
                            <Text type='body-12-regular' color='cbwhite'>
                              {stockData?.r}
                            </Text>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td className='py-[16px] align-middle'>
                    <div className='h-[2px] bg-[#5AC4C0]'></div>
                  </td>

                  <td className='border-x border-solid border-[#ccc] align-middle'>
                    <div className='h-[2px] bg-[#5AC4C0]'></div>
                  </td>

                  <td className='align-middle'>
                    <div className='flex items-center'>
                      <div className='h-[2px] w-1/2 bg-[#5AC4C0]'></div>
                      <div className='flex h-[16px] -translate-x-1/4 items-center justify-center rounded-[4px] bg-[#5AC4C0] px-[4px]'>
                        <Text type='body-12-regular' color='cbwhite'>
                          {stockData?.f}
                        </Text>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            )}

            {(!stockIntraday?.data || stockIntraday.data.length === 0) && (
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
        </table>
      )}
    </>
  );
};

export default IntradayTab;
