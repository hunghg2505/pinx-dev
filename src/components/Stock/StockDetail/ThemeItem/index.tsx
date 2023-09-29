import React from 'react';

import Image from 'next/image';

import { IStockTheme } from '@components/Stock/type';
import CustomImage from '@components/UI/CustomImage';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber, toNonAccentVietnamese } from '@utils/common';

interface IThemeItemProps {
  data: IStockTheme;
}

const ThemeItem = ({ data }: IThemeItemProps) => {
  const id =
    data.code + '-chu-de-' + toNonAccentVietnamese(data.name).toLowerCase().replaceAll(' ', '-');
  return (
    <CustomLink href={ROUTE_PATH.THEME_DETAIL(id)}>
      <div className='relative h-[214px] w-[149px] rounded-[12px] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:rounded-[12px] after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] after:content-[""]'>
        <div className='absolute left-[12px] top-[12px] flex h-[18px] w-[18px] items-center justify-center'>
          <img
            src='/static/icons/iconTheme.svg'
            alt='Icon theme'
            className='z-10 h-[13px] w-[16px] object-contain'
          />
        </div>

        <Image
          width='0'
          height='0'
          sizes='100vw'
          src={data.url}
          alt='Theme'
          className='absolute left-0 right-0 h-full w-full rounded-[12px] object-cover'
        />

        <div className='absolute bottom-0 left-0 right-0 z-10 p-[12px]'>
          <Text type='body-14-bold' color='cbwhite'>
            {data.name}
          </Text>

          <div className='mt-[6px] flex items-center'>
            <div className='flex items-center'>
              {data.latestSubscribe.map((item, index) => (
                <CustomImage
                  width='0'
                  height='0'
                  sizes='100vw'
                  key={index}
                  src={item.avatar}
                  alt='Avatar user'
                  className='h-[20px] w-[20px] rounded-full border border-solid border-[#F8FAFD33] object-cover [&:not(:first-child)]:-ml-[5px]'
                />
              ))}
            </div>

            {data.totalSubscribe > 0 && (
              <Text type='body-12-medium' color='cbwhite' className='ml-[6px]'>
                {formatStringToNumber(data.totalSubscribe)}+
              </Text>
            )}
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export default ThemeItem;
