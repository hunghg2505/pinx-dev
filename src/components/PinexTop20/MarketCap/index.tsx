import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopMarketCap } from '../service';

const MarketCap = () => {
  const { marketCap } = useGetTopMarketCap();
  return (
    <div className='mobile-max:pr-[16px]'>
      <Text type='body-14-regular' color='cbblack'>
        Top 20 companies having the largest capitalization
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        Unit: Trillion VND
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {marketCap?.map((marketCap: IProfit, index: number) => {
          return <PinexTop number={index + 1} key={`profit-${index}`} data={marketCap} />;
        })}
      </div>
    </div>
  );
};
export default MarketCap;
