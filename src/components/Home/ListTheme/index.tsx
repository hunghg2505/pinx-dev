import Slider from 'react-slick';

import ThemesItem from '@components/Themes/ThemesItem';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';

import { ITheme, useGetTheme } from '../service';

const settings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 2.5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
};

const ListTheme = () => {
  const token = getAccessToken();
  const isLogin = !!token;
  const { theme, refresh } = useGetTheme();
  return (
    <div>
      <div className='relative h-[191px] overflow-hidden'>
        <Slider {...settings} variableWidth>
          {theme?.map((item: ITheme, index: number) => {
            return <ThemesItem theme={item} key={index} isLogin={isLogin} refresh={refresh} />;
          })}
        </Slider>
      </div>
      <div className='mb-[20px] mt-[16px] flex h-[46px] w-full flex-row items-center justify-center rounded-[8px] bg-[#EAF4FB]'>
        <Text type='body-14-bold' color='primary-2'>
          Explore themes
        </Text>
      </div>
    </div>
  );
};
export default ListTheme;
