import React, { useState } from 'react';

import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Following = () => {
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
      <div className='flex flex-col gap-[8px]'>
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
export default Following;
