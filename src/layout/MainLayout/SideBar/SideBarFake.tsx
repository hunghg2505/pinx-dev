import React from 'react';

import Text from '@components/UI/Text';
import { PINETREE_LINK } from 'src/constant';

const SideBarFake = () => {
  return (
    <>
      <div className='mb-[12px] h-[40px] bg-[#eaf4fb]'></div>
      <a href={PINETREE_LINK} target='_blank' rel='noreferrer'>
        <div className='mt-[16px] h-[400px] w-[218px] bg-[#739bb9] object-contain laptop-max:px-[10px]'></div>
      </a>

      <div className='px-[10px] pt-[16px]'>
        <a href={PINETREE_LINK} target='_blank' rel='noopener noreferrer'>
          <Text type='body-12-regular' className='text-[#78909C]'>
            Copyright 2023. Công ty CP Chứng Khoán <span className='text-[#1F6EAC]'>Pinetree</span>
          </Text>
        </a>
        <Text type='body-12-regular' className='mt-[8px] text-[#78909C]'>
          GPKD: <span className='text-[#474D57]'>0101294902</span>
          <span className='block'>16:14 04/07/2023</span>
        </Text>
        <div className='mt-[20px] flex gap-x-[10px]'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.facebook.com/chungkhoanpinetree'
          >
            <div className='h-[32px] w-[32px] rounded-[50%] bg-[#5c98f6]'></div>
          </a>
          <a target='_blank' rel='noopener noreferrer' href='https://zalo.me/895810815009263150'>
            <div className='h-[32px] w-[32px] rounded-[50%] bg-[#59aaeb]'></div>
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.youtube.com/@ChungKhoanPinetree'
          >
            <div className='h-[32px] w-[32px] rounded-[50%] bg-[#ff5952]'></div>
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.tiktok.com/@pinetree_official'
          >
            <div className='h-[32px] w-[32px] rounded-[50%] bg-[#3f3f40]'></div>
          </a>
        </div>
      </div>
    </>
  );
};

export default SideBarFake;
