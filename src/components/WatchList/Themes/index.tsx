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
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Themes = (props: IProps) => {
  const { isEdit = false } = props;
  const { theme } = useGetTheme();
  return (
    <>
      {!isEdit && (
        <div className='max-w-[680px]'>
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
