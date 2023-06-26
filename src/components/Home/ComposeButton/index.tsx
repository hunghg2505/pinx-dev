import React from 'react';

import Image from 'next/image';

import Text from '@components/UI/Text';

const ComposeButton = () => {
  return (
    <div className='fixed bottom-[80px] z-10 h-[44px] min-w-[375px]'>
      <button className='ml-auto mr-[16px] flex h-full min-w-[130px] items-center rounded-[23px] bg-[linear-gradient(247.96deg,#1D6CAB_14.41%,#589DC0_85.59%)] px-[16px] desktop:hidden'>
        <Image
          src='/static/icons/iconPen.svg'
          alt='Icon pen'
          width={24}
          height={24}
          className='mr-[8px] h-[24px] w-[24px] object-contain'
        />

        <Text type='body-14-bold' color='neutral-9'>
          Compose
        </Text>
      </button>
    </div>
  );
};

export default ComposeButton;
