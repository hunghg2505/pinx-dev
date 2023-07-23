import React, { useState } from 'react';

import Search from '@components/common/Search';
import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Follower = () => {
  const [state, setState] = useState<{
    pages: number[];
    totalPages: number;
    notFound: boolean;
  }>({
    pages: [1],
    totalPages: 1,
    notFound: false,
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
      {state.notFound && <NotFound />}
    </>
  );
};
export default Follower;
