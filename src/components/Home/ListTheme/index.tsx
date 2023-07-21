import React from 'react';

import { useRouter } from 'next/router';
import Slider from 'react-slick';

import ThemesItem from '@components/Themes/ThemesItem';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

import { ITheme, useGetTheme } from '../service';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  // centerMode: true,
  // autoplay: true,
  // autoplaySpeed: 1000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
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
  const router = useRouter();
  const token = getAccessToken();
  const isLogin = !!token;
  const { theme, refresh } = useGetTheme();
  const refSlide: any = React.useRef();
  return (
    <div>
      <div className='relative h-[191px] '>
        <div
          onClick={() => refSlide.current.slickPrev()}
          className='absolute -left-[16px] top-2/4 z-10 h-[32px] w-[32px] -translate-y-2/4 transform cursor-pointer tablet-max:hidden'
        >
          <img src='/static/images/btn-prev.png' alt='' />
        </div>
        <div className='slideTheme overflow-hidden'>
          <Slider {...settings} variableWidth ref={refSlide}>
            {theme?.map((item: ITheme, index: number) => {
              return <ThemesItem theme={item} key={index} isLogin={isLogin} refresh={refresh} />;
            })}
          </Slider>
        </div>
        <div
          onClick={() => refSlide.current.slickNext()}
          className='absolute -right-[16px] top-2/4 z-10 h-[32px] w-[32px] -translate-y-2/4 transform tablet-max:hidden'
        >
          <img src='/static/images/btn-next.png' alt='' className=' cursor-pointer' />
        </div>
      </div>

      <div className='mb-[20px] mt-[16px] w-full pr-[16px]'>
        <div
          className='flex h-[46px] w-full cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[#EAF4FB]'
          onClick={() => router.push(ROUTE_PATH.THEME)}
        >
          <Text type='body-14-bold' color='primary-2'>
            Explore themes
          </Text>
        </div>
      </div>
    </div>
  );
};
export default ListTheme;
