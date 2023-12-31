import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopProfit } from '../service';

interface IProfitProps {
  onTrackingViewTickerInfo?: (stockCode: string, location: string) => void;
}

const Profit = ({ onTrackingViewTickerInfo }: IProfitProps) => {
  const { t } = useTranslation('explore');
  const { profit, loading } = useGetTopProfit();
  const maxProfit = profit && Math.max(...profit.map((item: IProfit) => item.profit));

  return (
    <div className=''>
      <Text type='body-14-regular' color='cbblack' className='galaxy-max:mb-2'>
        {t('top_20_tab.profit_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.profit_unit')}
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
          profit?.map((profit: IProfit, index: number) => {
            return (
              <PinexTop
                percent={((profit.profit || 0) / maxProfit) * 100}
                number={index + 1}
                key={`profit-${index}`}
                data={profit}
                onTrackingViewTickerInfo={() =>
                  onTrackingViewTickerInfo &&
                  onTrackingViewTickerInfo(profit?.stockCode, 'Profit tab')
                }
              />
            );
          })
        )}
      </div>
    </div>
  );
};
export default Profit;
