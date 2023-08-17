import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopMarketCap } from '../service';

const MarketCap = () => {
  const { t } = useTranslation('explore');
  const { marketCap } = useGetTopMarketCap();
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
        {marketCap?.map((marketCap: IProfit, index: number) => {
          return (
            <PinexTop
              percent={((marketCap.marketCapital || 0) / maxRevenue) * 100}
              number={index + 1}
              key={`profit-${index}`}
              data={marketCap}
            />
          );
        })}
      </div>
    </div>
  );
};
export default MarketCap;
