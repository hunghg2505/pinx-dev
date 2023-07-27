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
    pages: [],
    last: '',
    hasNext: true,
    notFound: false,
  });
  const { lastElementRef } = useElementOnscreen(() => {
    if (state.hasNext && state.last) {
      setState((prev) => ({ ...prev, pages: [...prev.pages, prev.last], hasNext: false }));
    }
  });
  return (
    <div>
      <Page last={state?.last} setState={state?.pages?.length === 0 ? setState : () => {}} />
      {state.pages?.map((page, index) => {
        if (index === state.pages.length - 1) {
          return <Page last={page} key={page} setState={setState} />;
        }
        return <Page last={page} key={page} />;
      })}
      <div ref={lastElementRef}></div>
      {state.notFound && <NotFound setState={setState} />}
    </div>
  );
};
export default Posts;
