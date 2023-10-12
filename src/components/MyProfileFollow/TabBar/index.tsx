import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop';
import { ROUTE_PATH } from '@utils/common';

interface ITabBarProps {
  tabKey: ProfileTabKey;
  tabName: string;
  onTabChange: (v: string) => void;
  activeTab: string;
  setFullName: (v: string) => void;
}

const TabBar = ({ tabKey, tabName, onTabChange, activeTab, setFullName }: ITabBarProps) => {
  const router = useRouter();
  const { profileSlug }: any = router.query;
  const { displayName, userId } = useMemo(() => {
    const lastIndexOfDashChar = (profileSlug as string)?.lastIndexOf('-');

    return {
      displayName: (profileSlug as string)?.slice(0, lastIndexOfDashChar),
      userId: (profileSlug as string)?.slice(lastIndexOfDashChar + 1),
    };
  }, [profileSlug]);

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
          const newPath = ROUTE_PATH.PROFILE_FOLLOW_V2(displayName, userId, tabKey);
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
