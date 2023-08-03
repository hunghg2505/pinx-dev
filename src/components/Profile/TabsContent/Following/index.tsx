import React, { useState } from 'react';

import Search from '@components/common/Search';
import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Following = () => {
  const [fullName, setFullName] = useState('');
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
      <Search onSearchChange={setFullName} />
      <div className='grid grid-cols-4 gap-[14px]'>
        {state.pages.map((page) => {
          if (page === state.pages.length) {
            return <Page fullName={fullName} page={page} key={page} setState={setState} />;
          }
          return <Page fullName={fullName} page={page} key={page} />;
        })}
        <div ref={lastElementRef}></div>
      </div>
      {state.notFound && <NotFound />}
    </>
  );
};
export default Following;
