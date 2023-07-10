import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';

const ChangeInPrice = () => {
  return (
    <div className='mobile-max:pr-[16px]'>
      <Text type='body-14-regular' color='cbblack'>
        Top 20 companies having the largest change in price within 1 year
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        Unit: %
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        <PinexTop number={1} changePrice />
        <PinexTop number={2} changePrice />
        <PinexTop number={3} changePrice />
        <PinexTop number={4} changePrice />
      </div>
    </div>
  );
};
export default ChangeInPrice;
