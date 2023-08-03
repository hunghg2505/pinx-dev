import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';

import Search from '@components/common/Search';
import { pageSize, useCustomerFollowing } from '@components/MyProfileFollow/service';
import useElementOnscreen from '@utils/useElementOnscreen';

import NotFound from './NotFound';
import Page from './Page';

const Following = ({ totalFollowing: total }: { totalFollowing: number }) => {
  const { t } = useTranslation('profile');
  const [fullName, setFullName] = useState('');
  const [totalFollowing, setTotalFollowing] = useState(total);
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
      <Search onSearchChange={setFullName} />
      <div className='grid grid-cols-4 gap-[14px]'>
        {state.pages.map((page) => {
          return <Page fullName={fullName} page={page} key={page} />;
        })}
        <div ref={lastElementRef}></div>
      </div>
      {totalFollowing < 1 && !fullName && <NotFound message={t('following_empty')} />}
      {totalFollowing < 1 && fullName && <NotFound message={t('profile:don’t_have_any_result')} />}
    </>
  );
};
export default Following;
