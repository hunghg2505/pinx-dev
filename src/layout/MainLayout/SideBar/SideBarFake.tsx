import React from 'react';

import Image from 'next/image';

import Text from '@components/UI/Text';
import { BANNER_URL, PINETREE_LINK } from 'src/constant';

const SideBarFake = () => {
  return (
    <>
      <div className='mb-[12px] h-[40px] bg-[#eaf4fb]'></div>
      <a href={PINETREE_LINK} target='_blank' rel='noreferrer'>
        <Image
          src={BANNER_URL}
          alt=''
          width={218}
          height={400}
          className='mt-[16px] h-[400px] w-[218px] object-contain laptop-max:px-[10px]'
          priority
        />
      </a>

      <div className='px-[10px] pt-[16px]'>
        {/* <a href={PINETREE_LINK} target='_blank' rel='noreferrer'>
            <img
              src='/static/images/pinetree_logo.png'
              alt=''
              sizes='100px'
              className='mb-[20px] h-[55px] w-[140px]'
            />
          </a> */}
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
            <Image
              src='/static/social/facebook.svg'
              alt=''
              width={0}
              height={0}
              sizes='100px'
              className='h-[32px] w-[32px]'
            />
          </a>
          <a target='_blank' rel='noopener noreferrer' href='https://zalo.me/895810815009263150'>
            <Image
              src='/static/social/zalo.png'
              alt=''
              width={0}
              height={0}
              sizes='100px'
              className='h-[32px] w-[32px]'
            />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.youtube.com/@ChungKhoanPinetree'
          >
            <Image
              src='/static/social/youtube.svg'
              alt=''
              width={0}
              height={0}
              sizes='100px'
              className='h-[32px] w-[32px]'
            />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.tiktok.com/@pinetree_official'
          >
            <Image
              src='/static/social/tik_tok.svg'
              alt=''
              width={0}
              height={0}
              sizes='100px'
              className='h-[32px] w-[32px]'
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default SideBarFake;
