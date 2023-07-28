import React, { useState } from 'react';

import Search from '@components/common/Search';
import { pageSize } from '@components/MyProfileFollow/service';
import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Following = ({ totalFollowing }: { totalFollowing: number }) => {
  const [state, setState] = useState<{
    pages: number[];
    totalPages: number;
  }>({
    pages: [1],
    totalPages: totalFollowing / pageSize,
  });
  const { lastElementRef } = useElementOnscreen(() => {
    if (state.pages.length * pageSize < totalFollowing) {
      setState((prev) => ({ ...prev, pages: [...prev.pages, prev.pages.length + 1] }));
    }
  });

  return (
    <>
      <Search />
      <div className='mb-[20px] grid grid-cols-4 gap-[14px]'>
        {state.pages.map((page) => {
          return <Page page={page} key={page} />;
        })}
        <div ref={lastElementRef}></div>
      </div>
      {totalFollowing < 1 && <NotFound />}
    </>
  );
};
export default Following;
