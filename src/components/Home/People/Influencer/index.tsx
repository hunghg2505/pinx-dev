import Slider from 'react-slick';

import { IKOL, useGetInfluencer } from '@components/Home/service';

import ItemInfluence from './ItemInfluence';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  // slidesToScroll: 1,
  swipeToSlide: true,

  // autoplay: true,
  // autoplaySpeed: 1000,
};
const Influencer = () => {
  const { KOL, refresh } = useGetInfluencer();
  return (
    <div className='peopleInfluence overflow-hidden'>
      <Slider {...settings} variableWidth>
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
  );
};
export default Influencer;
