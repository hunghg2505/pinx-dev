import React, { useState } from 'react';

import Search from '@components/common/Search';
import { pageSize } from '@components/MyProfileFollow/service';
import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Follower = ({ totalFollower }: { totalFollower: number }) => {
  const [state, setState] = useState<{
    pages: number[];
    totalPages: number;
  }>({
    pages: [1],
    totalPages: totalFollower / pageSize,
  });
  const { lastElementRef } = useElementOnscreen(() => {
    if (state.totalPages > state.pages.length) {
      setState((prev) => ({ ...prev, pages: [...prev.pages, prev.pages.length + 1] }));
    }
  });

  return (
    <>
      <Search />
      <div className='mb-[20px] grid grid-cols-4 gap-[14px]'>
        {state.pages.map((page) => {
          if (page === state.pages.length) {
            return <Page page={page} key={page} setState={setState} />;
          }
          return <Page page={page} key={page} />;
        })}
        <div ref={lastElementRef}></div>
      </div>
      {totalFollower < 1 && <NotFound />}
    </>
  );
};
export default Follower;
