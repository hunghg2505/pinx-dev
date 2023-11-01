import { useRef, useEffect } from 'react';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useInView } from 'react-intersection-observer';

import { IKOL, useGetInfluencer, useSuggestPeople } from '@components/Home/service';

import ItemInfluence from './ItemInfluence';
import InfluencerLoading from './Skeleton';

const Influencer = () => {
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
  if (!KOL) {
    return (
      <div>
        <InfluencerLoading />
      </div>
    );
  }

  // const ListInfluencer = KOL?.filter((item: IKOL) => item.isFeatureProfile === true);
  return (
    <div ref={ref} className='peopleInfluence relative w-[100%]'>
      <div
        onClick={() => {
          refSlide?.current?.splide.go('-2');
        }}
        className='absolute -left-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
      >
        <img
          src='/static/icons/iconGrayPrev.svg'
          alt='Icon prev'
          className='h-[16px] w-[7px] object-contain'
          loading='lazy'
        />
      </div>
      <div className='max-w-[700px]'>
        <Splide
          options={{
            perPage: 4,
            pagination: false,
            arrows: false,
            gap: 10,
            breakpoints: {
              1024: {
                perPage: 3,
              },
              768: {
                perPage: 3,
              },
              480: {
                perPage: 2,
              },
            },
          }}
          ref={refSlide}
        >
          {KOL?.filter((item: IKOL) => item.isFeatureProfile === true || item.isKol === true).map(
            (item: IKOL) => {
              return (
                <SplideSlide key={`ItemInfluence-${item.id}`}>
                  <div className='w-[161px] '>
                    <ItemInfluence data={item} refresh={refresh} refreshList={refreshList} />
                  </div>
                </SplideSlide>
              );
            },
          )}
        </Splide>
      </div>
      <div
        onClick={() => {
          refSlide?.current?.splide.go('+2');
        }}
        className='absolute -right-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
      >
        <img
          src='/static/icons/iconGrayNext.svg'
          alt='Icon next'
          className='h-[16px] w-[7px] object-contain'
          loading='lazy'
        />
      </div>
    </div>
  );
};
export default Influencer;
