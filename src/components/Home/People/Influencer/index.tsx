import Image from 'next/image';

import { IKOL, useGetInfluencer } from '@components/Home/service';
import Slider from 'react-slick';
import ItemInfluence from './ItemInfluence';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
};
const Influencer = () => {
  const { KOL, refresh } = useGetInfluencer();
  return (
    <div className='overflow-hidden'>
      <Slider {...settings} className=''>
        {KOL?.map((item: IKOL, index: number) => {
          return (
            <div key={index}>
              <ItemInfluence data={item} refresh={refresh} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default Influencer;
