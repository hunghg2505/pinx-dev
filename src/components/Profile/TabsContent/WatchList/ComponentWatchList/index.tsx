import React from 'react';

import ItemWatchList from '@components/WatchList/ItemWatchList';

const ComponentWatchList = ({ watchList }: { watchList: any }) => {
  return (
    <>
      <div className='flex flex-col gap-y-[16px] pb-[50px] tablet:pb-0'>
        {watchList?.map((item: any, index: number) => (
          <div
            key={index}
            className={
              'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] '
              // 'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
              //   isEdit,
            }
          >
            <ItemWatchList data={item} isEdit={false} refresh={() => {}} />
          </div>
        ))}
      </div>
    </>
  );
};
export default ComponentWatchList;
