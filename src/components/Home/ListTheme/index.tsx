import React from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';

// import ThemesItem from '@components/Themes/ThemesItem';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

import { ITheme, useGetTheme } from '../service';

const ThemesItem = dynamic(() => import('@components/Themes/ThemesItem'), {
  ssr: false,
});
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  swipeToSlide: true,
  // centerMode: true,
  // autoplay: true,
  // autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const ListTheme = () => {
  const { t } = useTranslation();
  const token = getAccessToken();
  const isLogin = !!token;
  const { theme, refresh } = useGetTheme();
  const refSlide: any = React.useRef();
  return (
    <div>
      <div className='relative h-[252px] '>
        <div
          onClick={refSlide?.current?.slickPrev}
          className='absolute -left-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
        >
          <img
            src='/static/icons/iconGrayPrev.svg'
            alt='Icon prev'
            className='h-[16px] w-[7px] object-contain'
          />
        </div>
        <div className='slideTheme max-w-[700px] overflow-hidden'>
          <Slider {...settings} variableWidth ref={refSlide}>
            {theme?.map((item: ITheme, index: number) => {
              return (
                <ThemesItem
                  theme={item}
                  key={`themeHome-${index}`}
                  isLogin={isLogin}
                  refresh={refresh}
                />
              );
            })}
          </Slider>
        </div>
        <div
          onClick={refSlide?.current?.slickNext}
          className='absolute -right-[14px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
        >
          <img
            src='/static/icons/iconGrayNext.svg'
            alt='Icon next'
            className='h-[16px] w-[7px] object-contain'
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
