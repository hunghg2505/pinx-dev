import Slider from 'react-slick';

import ThemesItem from '@components/Themes/ThemesItem';

import { ITheme, useGetTheme } from '../service';

const settings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 2.5,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
};

const ListTheme = () => {
  const { theme } = useGetTheme();
  return (
    <div className='relative h-[172px] overflow-hidden'>
      <Slider {...settings} variableWidth>
        {theme?.map((item: ITheme, index: number) => {
          return <ThemesItem theme={item} key={index} />;
        })}
      </Slider>
    </div>
  );
};
export default ListTheme;
