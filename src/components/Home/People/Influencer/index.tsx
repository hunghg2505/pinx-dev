import { useRef, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { IKOL, useGetInfluencer, useSuggestPeople } from '@components/Home/service';
import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';
import useSpildeOptions from '@hooks/useSplideOptions';

import ItemInfluence from './ItemInfluence';
import InfluencerLoading from './Skeleton';

const Influencer = () => {
  const { defaultSplideOptions } = useSpildeOptions();
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
      <SplideCustomWrap aria-label='My Favorite Images' options={defaultSplideOptions}>
        {KOL?.filter((item: IKOL) => item.isFeatureProfile === true || item.isKol === true).map(
          (item: IKOL, index: number) => {
            return (
              <SplideSlide key={`ItemInfluence-${index}`}>
                <div className='mr-[16px]'>
                  <div className='w-[161px] '>
                    <ItemInfluence data={item} refresh={refresh} refreshList={refreshList} />
                  </div>
                </div>
              </SplideSlide>
            );
          },
        )}
      </SplideCustomWrap>
    </div>
  );
};
export default Influencer;
