import React, { useRef, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { useInView } from 'react-intersection-observer';

import CustomLink from '@components/UI/CustomLink';
import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';
import Text from '@components/UI/Text';
import useSpildeOptions from '@hooks/useSplideOptions';
import { useLogin } from '@store/auth/hydrateAuth';
import { THEME } from 'src/constant/route';

import ThemeLoading from './Skeleton';
import { ITheme, useGetTheme } from '../service';

const ThemesItem = dynamic(() => import('@components/Themes/ThemesItem'), {
  ssr: false,
});

const ListTheme = () => {
  const { t } = useTranslation();

  const { isLogin } = useLogin();
  const { theme, refresh, fetchTheme } = useGetTheme();
  const { defaultSplideOptions } = useSpildeOptions();

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
        <SplideCustomWrap options={defaultSplideOptions}>
          {theme?.map((item: ITheme, index: number) => {
            return (
              <SplideSlide key={`themeHome-${index}`}>
                <ThemesItem theme={item} isLogin={isLogin} refresh={refresh} />
              </SplideSlide>
            );
          })}
        </SplideCustomWrap>
      </div>

      <CustomLink href={THEME}>
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
