import Image from 'next/image';

import Text from '@components/UI/Text';

const Influencer = () => {
  return (
    <>
      <div className="relative h-[252px] w-[100%] rounded-[15px] bg-[url('/static/images/influencer.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:bottom-[0] before:left-[0] before:h-full before:w-full before:rounded-[15px] before:bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0001)_59.32%,_rgba(0,_0,_0,_0.868253)_91.04%)] before:content-['']">
        <div className='absolute bottom-[19px] left-[15px] z-10 pr-[10px]'>
          <Text type='body-16-bold' color='cbwhite'>
            Lisa Simpson
          </Text>
          <Text type='body-14-regular' color='cbwhite' className='mt-[6px]'>
            Entrepreneur, founder at ABC
          </Text>
        </div>
        <div className='absolute right-[13px] top-[13px] flex h-[36px] w-[89px] cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[rgba(14,_29,_37,_0.5)]'>
          <Image
            src='/static/icons/iconPlus.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[5px] w-[8px]'
          />
          <Text type='body-14-semibold' color='neutral-9'>
            Follow
          </Text>
        </div>
      </div>
    </>
  );
};
export default Influencer;
