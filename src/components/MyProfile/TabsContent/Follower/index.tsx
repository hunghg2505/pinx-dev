import React, { useState } from 'react';

import Search from '@components/common/Search';
import useElementOnscreen from '@utils/useElementOnscreen';

import Page from './Page';

const Follower = () => {
  const [state, setState] = useState<{
    pages: number[];
    totalPages: number;
  }>({
    pages: [1],
    totalPages: 1,
  });
  const { lastElementRef } = useElementOnscreen(() => {
    if (state.totalPages > state.pages.length) {
      setState((prev) => ({ ...prev, pages: [...prev.pages, prev.pages.length + 1] }));
    }
  });
  const setTotalPages = (totalPages: number) => {
    setState((prev) => ({ ...prev, totalPages }));
  };
  return (
    <>
      <Search />
      <div className='grid grid-cols-4 gap-[14px]'>
        {state.pages.map((page) => {
          if (page === state.pages.length) {
            return <Page page={page} key={page} setTotalPages={setTotalPages} />;
          }
          return <Page page={page} key={page} />;
        })}
        <div ref={lastElementRef}></div>
      </div>
    </>
  );
};
export default Follower;
