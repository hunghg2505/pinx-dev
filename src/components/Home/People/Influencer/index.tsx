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
            return <ItemInfluence data={item} refresh={refresh} key={index} />;
          },
        )}
      </Slider>
    </div>
  );
};
export default Influencer;
