import React, { useEffect, useRef, useState } from 'react';

import UserItem from '@components/Explore/Search/UserItem';
import Loading from '@components/UI/Loading';
import { Skeleton } from '@components/UI/Skeleton';
import useBottomScroll from '@hooks/useBottomScroll';

import Empty from '../Empty';
import { ResponseSearchPeople, useSearchPeople } from '../service';

interface PeopleTabProps {
  textSearch: string;
  textSearchFormat: string;
}

const SkeletonLoadingPeople = () => {
  return (
    <Skeleton
      rows={2}
      height={66}
      wrapClassName='!gap-y-[16px] !w-full'
      className='!w-full !rounded-[12px]'
    />
  );
};

const PeopleTab = ({ textSearch, textSearchFormat }: PeopleTabProps) => {
  const [listPeople, setListPeople] = useState<ResponseSearchPeople>();
  const ref = useRef(null);
  const requestGetListPeople = useSearchPeople({
    manual: true,
    onSuccess: ({ data }: ResponseSearchPeople) => {
      setListPeople((prev) => ({
        data: {
          list: [...(prev?.data.list || []), ...data?.list],
          totalElements: data?.totalElements,
          totalPages: data?.totalPages,
          pageSize: data?.pageSize,
          pageNumber: data?.pageNumber,
          isLast: data?.isLast,
        },
      }));
    },
  });

  useEffect(() => {
    if (textSearch.trim()) {
      requestGetListPeople.run({
        textSearch: textSearchFormat,
      });
    }

    return () => {
      setListPeople(undefined);
    };
  }, [textSearch]);

  useBottomScroll(ref, () => {
    if (!listPeople?.data.isLast && !requestGetListPeople.loading) {
      requestGetListPeople.run({
        textSearch,
        page: Number(listPeople?.data.pageNumber) + 1,
      });
    }
  });

  return listPeople?.data?.totalElements ? (
    <div className='flex flex-col gap-y-[16px]' ref={ref}>
      {listPeople?.data.list?.map((item: any, index: number) => {
        return <UserItem data={{ ...item, id: item.customerId }} key={index} />;
      })}

      {!listPeople?.data.isLast && requestGetListPeople.loading && <SkeletonLoadingPeople />}
    </div>
  ) : (
    <>
      {listPeople && textSearch ? (
        <Empty keyword={textSearch} />
      ) : (
        <div className='flex min-h-[150px] flex-row items-center justify-center'>
          <Loading />
        </div>
      )}
    </>
  );
};

export default PeopleTab;
