import React from 'react';

import classNames from 'classnames';
import Slider from 'react-slick';

import { ITheme } from '@components/Home/service';

import styles from './index.module.scss';
import { useGetTheme } from './service';
import ThemeItem from './ThemeItem';

interface IProps {
  isEdit?: boolean;
}
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplaySpeed: 7000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};
const Themes = (props: IProps) => {
  const { isEdit = false } = props;
  const { theme } = useGetTheme();
  return (
    <>
      {!isEdit && (
        <div className='max-w-[700px]'>
          <Slider className={classNames('', styles.sliderTheme)} {...settings}>
            {theme?.map((item: ITheme, index: number) => {
              return (
                <div key={`them-${index}`}>
                  <ThemeItem data={item} />
                </div>
              );
            })}
          </Slider>
        </div>
      )}
    </>
  );
};
export default Themes;
