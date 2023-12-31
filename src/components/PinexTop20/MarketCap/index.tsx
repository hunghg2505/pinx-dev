import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopMarketCap } from '../service';

interface IMarketCapProps {
  onTrackingViewTickerInfo?: (stockCode: string, location: string) => void;
}

const MarketCap = ({ onTrackingViewTickerInfo }: IMarketCapProps) => {
  const { t } = useTranslation('explore');
  const { marketCap, loading } = useGetTopMarketCap();
  const maxRevenue = marketCap && Math.max(...marketCap.map((item: IProfit) => item.marketCapital));

  return (
    <div className=''>
      <Text type='body-14-regular' className='galaxy-max:mb-2' color='cbblack'>
        {t('top_20_tab.market_cap_desc')}
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        {t('top_20_tab.market_cap_unit')}
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
          marketCap?.map((marketCap: IProfit, index: number) => {
            return (
              <PinexTop
                percent={((marketCap.marketCapital || 0) / maxRevenue) * 100}
                number={index + 1}
                key={`profit-${index}`}
                data={marketCap}
                onTrackingViewTickerInfo={() => {
                  onTrackingViewTickerInfo &&
                    onTrackingViewTickerInfo(marketCap?.stockCode, 'Market Capitalization tab');
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
export default MarketCap;
