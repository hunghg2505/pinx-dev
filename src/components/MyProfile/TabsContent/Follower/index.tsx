import React, { useEffect, useState } from 'react';

import Search from '@components/common/Search';
import { pageSize, useCustomerFollower } from '@components/MyProfileFollow/service';
import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Follower = ({ totalFollower: total }: { totalFollower: number }) => {
  const [fullName, setFullName] = useState('');
  const [totalFollower, setTotalFollower] = useState(total);
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

  const requestGetListFollower = useCustomerFollower(
    {
      fullName,
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    (async () => {
      const { totalElements, totalPages } = await requestGetListFollower.runAsync();
      setTotalFollower(totalElements);
      setState({ pages: [1], totalPages });
    })();
  }, [fullName]);

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
      {totalFollower < 1 && <NotFound />}
    </>
  );
};
export default Follower;
