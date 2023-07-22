import React from 'react';

import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const TabBar = ({ tabKey }: { tabKey: string }) => {
  const { t } = useTranslation('profile');
  const searchParams = useSearchParams();
  const { push, query } = useRouter();

  return (
    <>
      <span
        className={classNames(
          'cursor-pointer text-[22px] font-[700] transition duration-300 ease-in-out',
          {
            'text-neutral_06': searchParams.get('tab') !== tabKey,
          },
        )}
        onClick={() => {
          push({ query: { ...query, tab: tabKey } });
        }}
      >
        {t(tabKey)}
      </span>
    </>
  );
};
export default TabBar;
