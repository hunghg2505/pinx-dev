import React, { useState } from 'react';

import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Follower = ({ fullName }: { fullName: string }) => {
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
    <div className='mb-[20px] flex flex-col gap-[8px]'>
      {state.pages.map((page) => {
        if (page === state.pages.length) {
          return <Page fullName={fullName} page={page} key={page} setState={setState} />;
        }
        return <Page fullName={fullName} page={page} key={page} />;
      })}
      <div ref={lastElementRef}></div>
      {state.notFound && <NotFound />}
    </div>
  );
};
export default Follower;
