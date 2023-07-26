import React from 'react';

import Slider from 'react-slick';

import { ISuggestionPeople } from '@components/Home/service';

import ItemPeople from '../ItemPeople';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  // autoplay: true,
  // autoplaySpeed: 1000,
};
interface IProps {
  data: ISuggestionPeople[];
  refresh: () => void;
}
const PeopleList = (props: IProps) => {
  const { data, refresh } = props;
  return (
    <div className='max-w-[700px]  overflow-hidden '>
      <Slider {...settings} className=''>
        {data?.slice(0, 3)?.map((item: ISuggestionPeople) => {
          return (
            <div key={`people-list-${item.id}`}>
              <ItemPeople data={item} refresh={refresh} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default PeopleList;
