import React from 'react';

import { ITheme } from '@components/Home/service';
import { Skeleton } from '@components/UI/Skeleton';
import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';
import useSpildeOptions from '@hooks/useSplideOptions';

import styles from './index.module.scss';
import { useGetTheme } from './service';
import ThemeItem from './ThemeItem';

interface IProps {
  isEdit?: boolean;
}
const Themes = (props: IProps) => {
  const { isEdit = false } = props;
  const { theme, loading } = useGetTheme();
  const { watchlistThemeSplideOptions } = useSpildeOptions();

  if (loading) {
    return (
      <div>
        <Skeleton className='!h-[500px] !w-full !rounded-[16px]' />
      </div>
    );
  }

  return (
    <>
      {!isEdit && (
        <div className='max-w-[100%]'>
          <SplideCustomWrap
            options={watchlistThemeSplideOptions}
            className={styles.watchlistThemeSplide}
          >
            {theme?.map((item: ITheme, index: number) => {
              return (
                <SplideSlide key={`them-${index}`}>
                  <ThemeItem data={item} />
                </SplideSlide>
              );
            })}
          </SplideCustomWrap>
        </div>
      )}
    </>
  );
};
export default Themes;
