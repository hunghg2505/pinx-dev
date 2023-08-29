import React from 'react';

import Slider from 'react-slick';

import { ISuggestionPeople } from '@components/Home/service';

// import PeopleLoading from './Skeleton';
import ItemPeople from '../ItemPeople';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
  // autoplay: true,
  // autoplaySpeed: 1000,
};
interface IProps {
  data: ISuggestionPeople[];
  refreshList: () => void;
  loading?: boolean;
  refresh: () => void;
}
const PeopleList = (props: IProps) => {
  const { data, refreshList, refresh } = props;

  // if (loading) {
  //   return (
  //     <div className='overflow-x-hidden whitespace-nowrap'>
  //       <PeopleLoading />
  //       <PeopleLoading />
  //       <PeopleLoading />
  //       <PeopleLoading />
  //       <PeopleLoading />
  //     </div>
  //   );
  // }

  return (
    <div className='ml-[12px] max-w-[700px] overflow-hidden  '>
      <Slider {...settings} className=''>
        {data?.slice(0, 3)?.map((item: ISuggestionPeople) => {
          return (
            <div key={`people-list-${item.id}`}>
              <ItemPeople refresh={refresh} data={item} refreshList={refreshList} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default PeopleList;
