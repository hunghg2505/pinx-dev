import Slider from 'react-slick';

import ThemesItem from '@components/Themes/ThemesItem';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
};

const ListTheme = () => {
  return (
    <div className='relative overflow-hidden'>
      <Slider {...settings} className='slide-watchlist'>
        <div className='mr-[10px]'>
          <ThemesItem />
        </div>
        <div className='mr-[10px]'>
          <ThemesItem />
        </div>
        <div className='mr-[10px]'>
          <ThemesItem />
        </div>
        <div className='mr-[10px]'>
          <ThemesItem />
        </div>
      </Slider>
      <div className='absolute -top-[24px] right-0 h-[212px] w-[58px] bg-[linear-gradient(249.76deg,_#FFFFFF_13.47%,_rgba(248,_250,_253,_0)_86.53%)] [border-right:1px_solid_#EAF4FB]'></div>
    </div>
  );
};
export default ListTheme;
