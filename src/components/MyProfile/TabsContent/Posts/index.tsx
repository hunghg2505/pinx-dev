import React, { useState } from 'react';

import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Posts = () => {
  const [state, setState] = useState<{
    pages: string[];
    last: string;
    hasNext: boolean;
    notFound: boolean;
  }>({
    pages: ['1'],
    last: '',
    hasNext: true,
    notFound: false,
  });
  const { lastElementRef } = useElementOnscreen(() => {
    if (state.hasNext && state.last) {
      setState((prev) => ({ ...prev, pages: [...prev.pages, prev.last], hasNext: false }));
    }
  });
  console.log(state);
  return (
    <div>
      {/* <Page setState={state?.pages?.length === 0 ? setState : () => {}} /> */}
      {state.pages?.map((page, index) => {
        if (index === state.pages.length - 1) {
          return <Page last={page} key={state.last+page} setState={setState} />;
        }
        return <Page last={page} key={state.last+page} />;
      })}
      <div ref={lastElementRef}></div>
      {state.notFound && <NotFound setState={setState} />}
    </div>
  );
};
export default Posts;
