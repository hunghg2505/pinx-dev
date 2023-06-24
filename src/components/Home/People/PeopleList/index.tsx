import React from 'react';

import Slider from 'react-slick';

import { ISuggestionPeople } from '@components/Home/service';

import ItemPeople from '../ItemPeople';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
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
    <div className='overflow-hidden'>
      <Slider {...settings} className='slide-watchlist'>
        {data?.map((item: ISuggestionPeople, index: number) => {
          return (
            <div key={index}>
              <ItemPeople data={item} refresh={refresh} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default PeopleList;
