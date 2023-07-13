import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopPrice } from '../service';

const Price = () => {
  const { price } = useGetTopPrice();
  return (
    <div className='mobile-max:pr-[16px]'>
      <Text type='body-14-regular' color='cbblack'>
        Top 20 companies having the highest market price based on last closing price
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        Unit: VND
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {price?.map((price: IProfit, index: number) => {
          return <PinexTop number={index + 1} key={`profit-${index}`} data={price} />;
        })}
      </div>
    </div>
  );
};
export default Price;
