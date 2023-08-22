import React, { useMemo } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import { REVENUE_CHART_COLOR } from '@components/Stock/const';
import { ITaggingInfo } from '@components/Stock/type';
import Text from '@components/UI/Text';

import { PieChart } from '../Chart';
import RevenueItem from '../RevenueItem';

interface IStockRevenueProps {
  taggingInfo?: {
    data?: ITaggingInfo;
  };
}

const StockRevenue = ({ taggingInfo }: IStockRevenueProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const { revenueChartData, revenueLastUpdated } = useMemo(() => {
    const revenueChartData =
      taggingInfo?.data?.revenues.map((item) => ({ value: item.percentage })) || [];

    let revenueLastUpdated = null;
    if (taggingInfo?.data?.revenues && taggingInfo?.data?.revenues.length > 0) {
      const lastUpdate = dayjs.max(
        taggingInfo?.data?.revenues
          .filter((item) => item.updatedAt)
          .map((item) => dayjs(item.updatedAt)),
      );

      revenueLastUpdated = {
        quarter: dayjs(lastUpdate).subtract(3, 'M').quarter(),
        year: dayjs(lastUpdate).subtract(3, 'M').get('year'),
      };
    }

    return {
      revenueChartData,
      revenueLastUpdated,
    };
  }, [taggingInfo]);

  if (!taggingInfo?.data?.revenues || !taggingInfo?.data?.revenues.length) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('revenue_sources')}
      </Text>

      <div className='tablet:flex tablet:items-center tablet:justify-between tablet:gap-x-[63px]'>
        <div className='flex flex-col items-center'>
          <div className='galaxy-max:scale-[0.7]'>
            <PieChart width={319} height={296} data={revenueChartData} />
          </div>

          <Text type='body-10-regular' color='primary-5' className='mt-[28px] text-center'>
            {t('revenue_last_updated', {
              quarter: revenueLastUpdated?.quarter,
              year: revenueLastUpdated?.year,
            })}
          </Text>
        </div>

        <div className='tablet:flex-1'>
          <div className='mt-[8px]'>
            {taggingInfo?.data?.revenues.map((item, index) => (
              <RevenueItem
                color={
                  REVENUE_CHART_COLOR[
                    index % ((taggingInfo?.data && taggingInfo?.data?.revenues.length) || 0)
                  ]
                }
                key={index}
                value={
                  Number.isInteger(item.percentage) ? item.percentage : +item.percentage.toFixed(2)
                }
                label={item.sourceVi}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockRevenue;
