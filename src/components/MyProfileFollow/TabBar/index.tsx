import React from 'react';

import classNames from 'classnames';

import { ROUTE_PATH } from '@utils/common';

interface ITabBarProps {
  tabKey: string;
  tabName: string;
  onTabChange: (v: string) => void;
  activeTab: string;
  setFullName: (v: string) => void;
}

const TabBar = ({ tabKey, tabName, onTabChange, activeTab, setFullName }: ITabBarProps) => {
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
          const newPath = ROUTE_PATH.MY_PROFILE_FOLLOW(tabKey);
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
        {tabName}
      </span>
    </>
  );
};
export default TabBar;
