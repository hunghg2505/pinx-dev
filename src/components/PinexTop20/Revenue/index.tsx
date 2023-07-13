import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopRevenue } from '../service';

const Revenue = () => {
  const { revenue } = useGetTopRevenue();
  return (
    <div className='mobile-max:pr-[16px]'>
      <Text type='body-14-regular' color='cbblack'>
        Top 20 companies having the largest revenue in recent quarter
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        Unit: billion VND
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {revenue?.map((revenue: IProfit, index: number) => {
          return <PinexTop number={index + 1} key={`profit-${index}`} data={revenue} />;
        })}
      </div>
    </div>
  );
};
export default Revenue;
