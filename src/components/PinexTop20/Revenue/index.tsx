import Text from '@components/UI/Text';

import PinexTop from '../PinexTop';

const Revenue = () => {
  return (
    <div className='mobile-max:pr-[16px]'>
      <Text type='body-14-regular' color='cbblack'>
        Top 20 companies having the largest revenue in recent quarter
      </Text>
      <Text type='body-12-regular' color='cbblack' className='text-right italic'>
        Unit: billion VND
      </Text>
      <div className='mt-[16px] flex flex-col gap-y-[16px]'>
        <PinexTop number={1} />
        <PinexTop number={2} />
        <PinexTop number={3} />
        <PinexTop number={4} />
      </div>
    </div>
  );
};
export default Revenue;
