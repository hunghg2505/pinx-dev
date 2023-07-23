import React, { useState } from 'react';

import { useRouter } from 'next/router';

import NotFound2 from '@components/MyProfileFollow/Following/NotFound2';
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
  const router = useRouter();
  const { lastElementRef } = useElementOnscreen(() => {
    if (state.totalPages > state.pages.length) {
      setState((prev) => ({ ...prev, pages: [...prev.pages, prev.pages.length + 1] }));
    }
  });
  return (
    <div className='mb-[20px] flex flex-col gap-[8px]'>
      {state.pages.map((page) => {
        if (page === state.pages.length) {
          return <Page page={page} key={page} setState={setState} />;
        }
        return <Page page={page} key={page} />;
      })}
      <div ref={lastElementRef}></div>
      {state.notFound && !!router.query.search && <NotFound />}
      {state.notFound && !router.query.search && <NotFound2 />}
    </div>
  );
};
export default Following;
