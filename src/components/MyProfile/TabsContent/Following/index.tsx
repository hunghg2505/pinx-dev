import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Search from '@components/common/Search';
import { pageSize, useCustomerFollowing } from '@components/MyProfileFollow/service';
import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Following = ({ totalFollowing: total }: { totalFollowing: number }) => {
  const router = useRouter();
  const [totalFollowing, setTotalFollowing] = useState(total);
  const { fullName }: any = router.query;
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

  const requestGetListFollowing = useCustomerFollowing(
    {
      fullName,
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    (async () => {
      const { totalElements, totalPages } = await requestGetListFollowing.runAsync();
      setTotalFollowing(totalElements);
      setState({ pages: [1], totalPages });
    })();
  }, [fullName]);

  return (
    <>
      <Search fullName={fullName} />
      <div className='grid grid-cols-4 gap-[14px]'>
        {state.pages.map((page) => {
          return <Page fullName={fullName} page={page} key={page} />;
        })}
        <div ref={lastElementRef}></div>
      </div>
      {totalFollowing < 1 && <NotFound />}
    </>
  );
};
export default Following;
