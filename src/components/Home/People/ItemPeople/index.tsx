import Image from 'next/image';

import Text from '@components/UI/Text';

const ItemPeople = () => {
  return (
    <>
      <div className='m-[6px] flex flex-col items-center rounded-[15px] border-[1px] border-solid border-[#F4F4F4] bg-[rgba(255,_255,_255,_0.704436)] px-[9px] pb-[10px] pt-[14px] backdrop-blur-[8.15485px] backdrop-filter [box-shadow:0px_5px_8px_rgba(88,_157,_192,_0.0948973)]'>
        <Image
          src='/static/icons/avatar.svg'
          alt=''
          width='0'
          height='0'
          className='mb-[10px] w-[56px] rounded-full'
        />
        <Text type='body-14-semibold' color='cbblack' className='mb-[3px] text-center'>
          Pinetree
        </Text>
        <Text type='body-12-medium' className='mb-[9px]' color='neutral-4'>
          @pinetreeofficial
        </Text>
        <div className='flex h-[36px] w-[106px] items-center justify-center rounded-[5px] bg-[#1F6EAC]'>
          <Image
            src='/static/icons/iconPlus.svg'
            alt=''
            width='0'
            height='0'
            className='mr-[5px] w-[10px]'
          />
          <Text type='body-14-bold' color='cbwhite'>
            Follow
          </Text>
        </div>
      </div>
    </>
  );
};
export default ItemPeople;
