import React from 'react';

import { SplideSlide, Splide } from '@splidejs/react-splide';

import { ISuggestionPeople } from '@components/Home/service';

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
      <Splide
        options={{
          perPage: 3,
          pagination: false,
          arrows: false,
          gap: 10,
          breakpoints: {
            1024: {
              perPage: 2,
            },
            768: {
              perPage: 2,
            },
            480: {
              perPage: 2,
            },
          },
        }}
      >
        {data?.slice(0, 3)?.map((item: ISuggestionPeople) => {
          return (
            <SplideSlide key={`people-list-${item.id}`} className='outline-none'>
              <ItemPeople refresh={refresh} data={item} refreshList={refreshList} />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
export default PeopleList;
