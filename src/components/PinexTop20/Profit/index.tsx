import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopProfit } from '../service';

const Profit = () => {
  const { profit } = useGetTopProfit();
  return (
    <div className='mobile-max:pr-[16px]'>
      <Text type='body-14-regular' color='cbblack'>
        Top 20 companies having the largest profit in recent quarter
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        Unit: million VND
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {profit?.map((profit: IProfit, index: number) => {
          return <PinexTop number={index + 1} key={`profit-${index}`} data={profit} />;
        })}
      </div>
    </div>
  );
};
export default Profit;
