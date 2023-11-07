import React from 'react';

import { ISuggestionPeople } from '@components/Home/service';
import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';

// import PeopleLoading from './Skeleton';

import ItemPeople from '../ItemPeople';

interface IProps {
  data: ISuggestionPeople[];
  refreshList: () => void;
  loading?: boolean;
  refresh: () => void;
}
const PeopleList = (props: IProps) => {
  const { data, refreshList, refresh } = props;
  const splideOptions = {
    type: 'slide',
    perPage: 3,
    speed: 500,
    gap: '16px',
    pagination: false,
    arrows: false,
    breakpoints: {
      300: {
        perPage: 2,
      },
    },
  };
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
    <SplideCustomWrap aria-label='My Favorite Images' options={splideOptions}>
      {data?.slice(0, 3)?.map((item: ISuggestionPeople) => {
        return (
          <SplideSlide key={`people-list-${item.id}`}>
            <div className='outline-none'>
              <ItemPeople refresh={refresh} data={item} refreshList={refreshList} />
            </div>
          </SplideSlide>
        );
      })}
    </SplideCustomWrap>
  );
};
export default PeopleList;
