import React from 'react';

import { IStockTheme } from '@components/Stock/type';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber } from '@utils/common';

interface IThemeItemProps {
  data: IStockTheme;
}

const ThemeItem = ({ data }: IThemeItemProps) => {
  return (
    <CustomLink href={ROUTE_PATH.THEME_DETAIL(data.code)}>
      <div className='relative h-[214px] w-[149px] rounded-[12px] after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:rounded-[12px] after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] after:content-[""]'>
        <div className='absolute left-[12px] top-[12px] flex h-[18px] w-[18px] items-center justify-center'>
          <img
            src='/static/icons/iconTheme.svg'
            alt='Icon theme'
            className='z-10 h-[13px] w-[16px] object-contain'
          />
        </div>

        <img
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
                <img
                  key={index}
                  src={item.avatar}
                  alt='Avatar user'
                  className='h-[20px] w-[20px] rounded-full border border-solid border-[#F8FAFD33] object-cover [&:not(:first-child)]:-ml-[5px]'
                />
              ))}
            </div>

            <Text type='body-12-medium' color='cbwhite' className='ml-[6px]'>
              {formatStringToNumber(data.totalSubscribe)}+
            </Text>
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export default ThemeItem;
