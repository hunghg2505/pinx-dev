import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ROUTE_PATH } from '@utils/common';

interface ITabBarProps {
  tabKey: string;
  onTabChange: (v: string) => void;
  activeTab: string;
  setFullName: (v: string) => void;
}

const TabBar = ({ tabKey, onTabChange, activeTab, setFullName }: ITabBarProps) => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { id }: any = router.query;

  return (
    <>
      <span
        className={classNames(
          'cursor-pointer text-[18px] font-[700] transition duration-300 ease-in-out galaxy-max:text-[16px]',
          {
            'text-neutral_06': activeTab !== tabKey,
          },
        )}
        onClick={() => {
          onTabChange(tabKey);
          setFullName('');
          const newPath = ROUTE_PATH.PROFILE_DETAIL_FOLLOW(id, tabKey);
          let currentLocale = window.history.state?.options?.locale;
          currentLocale = currentLocale === 'en' ? '/en' : '';

          window.history.replaceState(
            {
              ...window.history.state,
              as: newPath,
              url: currentLocale + newPath,
            },
            '',
            currentLocale + newPath,
          );
        }}
      >
        {t(tabKey)}
      </span>
    </>
  );
};
export default TabBar;
