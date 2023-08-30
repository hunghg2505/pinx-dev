import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { ROUTE_PATH } from '@utils/common';

interface ITabBarProps {
  tabKey: string;
  onTabChange: (v: string) => void;
  activeTab: string;
  setFullName: (v: string) => void;
  tab: string;
}

const TabBar = ({ tabKey, onTabChange, activeTab, setFullName, tab }: ITabBarProps) => {
  const { t } = useTranslation('profile');

  return (
    <>
      <span
        className={classNames(
          'text-[18px] font-[700] transition duration-300 ease-in-out galaxy-max:text-[16px]',
          {
            'text-neutral_06': activeTab !== tabKey,
          },
        )}
        onClick={() => {
          onTabChange(tabKey);
          setFullName('');
          tab && window.history.replaceState('', '', ROUTE_PATH.MY_PROFILE_FOLLOW);
        }}
      >
        {t(tabKey)}
      </span>
    </>
  );
};
export default TabBar;
