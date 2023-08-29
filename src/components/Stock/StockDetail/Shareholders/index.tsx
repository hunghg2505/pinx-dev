import React, { useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import { SHARE_HOLDER_COLOR } from '@components/Stock/const';
import { useShareholder } from '@components/Stock/service';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { formatStringToNumber } from '@utils/common';

import StockShareholdersSkeleton from './skeleton';
import { DonutChart } from '../Chart';

interface IStockShareholdersProps {
  stockCode: string;
}

const StockShareholders = ({ stockCode }: IStockShareholdersProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const { isMobile } = useResponsive();

  const { shareholder, loading } = useShareholder(stockCode);

  const { shareholderChartData } = useMemo(() => {
    const shareholderChartData =
      shareholder?.data?.map((item) => ({ ...item, value: item.ratio })) || [];

    return {
      shareholderChartData,
    };
  }, [shareholder]);

  if (loading) {
    return <StockShareholdersSkeleton />;
  }

  if (!shareholder?.data || shareholder.data.length === 0) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-bold'>{t('shareholders_title')}</Text>

      {/* chart */}
      <div className='mt-[28px] flex flex-col-reverse justify-between gap-x-[12px] gap-y-[28px] tablet:flex-row tablet:items-center'>
        <div className='grid flex-1 grid-cols-1 gap-x-[12px] gap-y-[24px] self-start tablet:grid-cols-2 tablet:self-center'>
          {shareholder?.data?.map((item, index) => (
            <div key={index} className='self-start'>
              <div className='mb-[6px] flex items-center'>
                <div
                  className='h-[10px] w-[35px] rounded-full'
                  style={{
                    backgroundColor:
                      SHARE_HOLDER_COLOR[
                        index %
                          (shareholder?.data && shareholder?.data.length > 0
                            ? shareholder.data.length
                            : 0)
                      ],
                  }}
                ></div>
                <Text type='body-14-semibold' className='ml-[4px]'>
                  {item.ratio}%
                </Text>
              </div>

              <Text type='body-12-regular' className='!leading-[16px] text-[#808A9D]'>
                {item.name}
              </Text>
              <Text type='body-12-regular' color='primary-5' className='!leading-[16px]'>
                {formatStringToNumber(item.value) || 0}
              </Text>
            </div>
          ))}
        </div>

        <div className='mx-auto'>
          <DonutChart
            strokeWidth={isMobile ? 16 : 27}
            width={isMobile ? 183 : 318}
            height={isMobile ? 183 : 318}
            data={shareholderChartData}
          />
        </div>
      </div>
    </div>
  );
};

export default StockShareholders;
