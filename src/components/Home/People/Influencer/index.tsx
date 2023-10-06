import { useRef, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import Slider from 'react-slick';

import { IKOL, useGetInfluencer, useSuggestPeople } from '@components/Home/service';

import ItemInfluence from './ItemInfluence';
import InfluencerLoading from './Skeleton';
// import InfluencerLoading from './Skeleton';

const Influencer = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    swipeToSlide: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
    // autoplay: true,
    // autoplaySpeed: 1000,
  };
  const { KOL, refresh, fetchInfluencer } = useGetInfluencer(
    {
      cacheKey: 'data-influencer',
      manual: true,
    },
    {
      size: 9999,
    },
  );
  const { refreshList } = useSuggestPeople({
    // staleTime: -1,
    cacheKey: 'data-suggestionPeople',
  });
  const refSlide: any = useRef();
  const { ref, inView } = useInView();
  const checkRef = useRef(false);

  useEffect(() => {
    if (inView && !checkRef.current) {
      fetchInfluencer({
        size: 9999,
      });
      checkRef.current = true;
    }
  }, [inView]);
  if (KOL?.length === 0) {
    return (
      <div className='overflow-x-hidden whitespace-nowrap'>
        <InfluencerLoading />
        <InfluencerLoading />
        <InfluencerLoading />
        <InfluencerLoading />
        <InfluencerLoading />
      </div>
    );
  }

  // const ListInfluencer = KOL?.filter((item: IKOL) => item.isFeatureProfile === true);
  return (
    <div ref={ref} className='peopleInfluence relative w-[100%]'>
      <div
        onClick={refSlide?.current?.slickPrev}
        className='absolute -left-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
      >
        <img
          src='/static/icons/iconGrayPrev.svg'
          alt='Icon prev'
          className='h-[16px] w-[7px] object-contain'
        />
      </div>
      <div className='max-w-[700px]'>
        <Slider {...settings} variableWidth ref={refSlide} draggable={true}>
          {KOL?.filter((item: IKOL) => item.isFeatureProfile === true || item.isKol === true).map(
            (item: IKOL, index: number) => {
              return (
                <div key={`ItemInfluence-${index}`} className='mr-[16px]'>
                  <div className='w-[161px] '>
                    <ItemInfluence data={item} refresh={refresh} refreshList={refreshList} />
                  </div>
                </div>
              );
            },
          )}
        </Slider>
      </div>
      <div
        onClick={refSlide?.current?.slickNext}
        className='absolute -right-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
      >
        <img
          src='/static/icons/iconGrayNext.svg'
          alt='Icon next'
          className='h-[16px] w-[7px] object-contain'
        />
      </div>
    </div>
  );
};
export default Influencer;
