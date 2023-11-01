import React from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import classNames from 'classnames';

import { ITheme } from '@components/Home/service';
import { Skeleton } from '@components/UI/Skeleton';

import styles from './index.module.scss';
import { useGetTheme } from './service';
import ThemeItem from './ThemeItem';

interface IProps {
  isEdit?: boolean;
}
// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   autoplaySpeed: 7000,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
// };
const Themes = (props: IProps) => {
  const { isEdit = false } = props;
  const { theme, loading } = useGetTheme();

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
          <Splide
            className={classNames('', styles.sliderTheme)}
            options={{
              perPage: 1,
              pagination: false,
              arrows: false,
              gap: 10,
              autoplay: true,
            }}
          >
            {theme?.map((item: ITheme) => {
              return (
                <SplideSlide key={`them-${item.code}`}>
                  <ThemeItem data={item} />
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      )}
    </>
  );
};
export default Themes;
