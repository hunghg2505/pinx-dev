import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';
import { IProfit, useGetTopChangePrice } from '../service';

const ChangeInPrice = () => {
  const { changePriceInY } = useGetTopChangePrice();
  return (
    <div className=''>
      <Text type='body-14-regular' color='cbblack'>
        Top 20 companies having the largest change in price within 1 year
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        Unit: %
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        {changePriceInY?.map((changePriceInY: IProfit, index: number) => {
          return (
            <PinexTop
              number={index + 1}
              key={`profit-${index}`}
              data={changePriceInY}
              changePrice
            />
          );
        })}
      </div>
    </div>
  );
};
export default ChangeInPrice;
