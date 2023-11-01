import React, { useRef, useEffect } from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useLogin } from '@store/auth/hydrateAuth';
import { ROUTE_PATH } from '@utils/common';

import ThemeLoading from './Skeleton';
import { ITheme, useGetTheme } from '../service';

const ThemesItem = dynamic(() => import('@components/Themes/ThemesItem'), {
  ssr: false,
});

const ListTheme = () => {
  const { t } = useTranslation();

  const { isLogin } = useLogin();
  const { theme, refresh, fetchTheme } = useGetTheme();
  const refSlide: any = React.useRef();

  const { ref, inView } = useInView();
  const checkRef = useRef(false);

  useEffect(() => {
    if (inView && !checkRef.current) {
      fetchTheme();
      checkRef.current = true;
    }
  }, [inView]);

  if (theme?.length === 0) {
    return (
      <div className='overflow-x-hidden whitespace-nowrap'>
        <ThemeLoading />
        <ThemeLoading />
        <ThemeLoading />
        <ThemeLoading />
        <ThemeLoading />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <div className='relative h-[252px] '>
        <div
          onClick={() => {
            refSlide?.current?.splide.go('-2');
          }}
          className='absolute -left-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
        >
          <img
            src='/static/icons/iconGrayPrev.svg'
            alt='Icon prev'
            className='h-[16px] w-[7px] object-contain'
            loading='lazy'
          />
        </div>
        <div className='slideTheme max-w-[700px] overflow-hidden'>
          <Splide
            options={{
              perPage: 4,
              pagination: false,
              arrows: false,
              gap: 10,
              breakpoints: {
                1024: {
                  perPage: 3,
                },
                768: {
                  perPage: 3,
                },
                480: {
                  perPage: 2,
                },
              },
            }}
            ref={refSlide}
          >
            {theme?.map((item: ITheme) => {
              return (
                <SplideSlide key={`themeHome-${item.code}`}>
                  <ThemesItem theme={item} isLogin={isLogin} refresh={refresh} />
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
        <div
          onClick={() => {
            refSlide?.current?.splide.go('+2');
          }}
          className='absolute -right-[14px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
        >
          <img
            src='/static/icons/iconGrayNext.svg'
            alt='Icon next'
            className='h-[16px] w-[7px] object-contain'
            loading='lazy'
          />
        </div>
      </div>

      <CustomLink href={ROUTE_PATH.THEME}>
        <div className=' mt-[16px] w-full'>
          <div className='flex h-[46px] w-full cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[#EAF4FB]'>
            <Text type='body-14-bold' color='primary-2'>
              {t('theme:explore_themes')}
            </Text>
          </div>
        </div>
      </CustomLink>
    </div>
  );
};
export default ListTheme;
