import React from 'react';

import Slider from 'react-slick';

import { IKOL, useGetInfluencer } from '@components/Home/service';

import ItemInfluence from './ItemInfluence';

const Influencer = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
    swipeToSlide: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    // autoplay: true,
    // autoplaySpeed: 1000,
  };
  const { KOL, refresh } = useGetInfluencer();
  // const ListInfluencer = KOL?.filter((item: IKOL) => item.isFeatureProfile === true);
  const refSlide: any = React.useRef();
  return (
    <div className='peopleInfluence relative'>
      <div
        onClick={() => refSlide.current.slickPrev()}
        className='absolute -left-[16px] top-2/4 z-10 h-[32px] w-[32px] -translate-y-2/4 transform cursor-pointer tablet-max:hidden'
      >
        <img src='/static/images/btn-prev.png' alt='' />
      </div>
      <div className='overflow-hidden'>
        <Slider {...settings} variableWidth ref={refSlide}>
          {KOL?.filter((item: IKOL) => item.isFeatureProfile === true).map(
            (item: IKOL, index: number) => {
              return (
                <div key={index} className='mr-[16px]'>
                  <div className='w-[161px]'>
                    <ItemInfluence data={item} refresh={refresh} />
                  </div>
                </div>
              );
            },
          )}
        </Slider>
      </div>

      <div
        onClick={() => refSlide.current.slickNext()}
        className='absolute -right-[16px] top-2/4 z-10 h-[32px] w-[32px] -translate-y-2/4 transform tablet-max:hidden'
      >
        <img src='/static/images/btn-next.png' alt='' className=' cursor-pointer' />
      </div>
    </div>
  );
};
export default Influencer;
