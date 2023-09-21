import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopRevenue } from '../service';

interface IRevenueProps {
  onTrackingViewTickerInfo?: (stockCode: string, location: string) => void;
}

const Revenue = ({ onTrackingViewTickerInfo }: IRevenueProps) => {
  const { t } = useTranslation('explore');
  const { revenue, loading } = useGetTopRevenue();
  const maxRevenue = revenue && Math.max(...revenue.map((item: IProfit) => item.revenue));

  return (
    <div className=''>
      <Text type='body-14-regular' className='galaxy-max:mb-2' color='cbblack'>
        {t('top_20_tab.revenue_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.revenue_unit')}
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {loading ? (
          <Skeleton
            height={68}
            rows={10}
            wrapClassName='!gap-y-[16px]'
            className='!w-full !rounded-[15px]'
          />
        ) : (
          revenue?.map((revenue: IProfit, index: number) => {
            return (
              <PinexTop
                percent={((revenue.revenue || 0) / maxRevenue) * 100}
                number={index + 1}
                key={`profit-${index}`}
                data={revenue}
                onTrackingViewTickerInfo={() => {
                  onTrackingViewTickerInfo &&
                    onTrackingViewTickerInfo(revenue?.stockCode, 'Revenue tab');
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
export default Revenue;
