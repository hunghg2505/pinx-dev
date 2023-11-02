import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ModalPage from '@components/ModalPage';
import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop/type';

import Back from './Back';
import Search from './Search';
import TabBar from './TabBar';

const Follower = dynamic(() => import('./Follower'));
const Following = dynamic(() => import('./Following'));
const ProfileFollow = () => {
  const { t } = useTranslation('profile');
  const [fullName, setFullName] = useState('');
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.FOLLOWERS);
  const router = useRouter();
  const { tab }: any = router.query;

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <>
      {/* <HeaderMobile /> */}
      <div className='relative bg-white'>
        <ModalPage />
        <header className='mb-[24px] flex px-[16px] py-[16px] align-middle text-[16px]'>
          <Back />
        </header>
        <main className='px-[16px]'>
          <div className='mb-[20px] flex gap-[32px] galaxy-max:justify-between  galaxy-max:gap-0 '>
            <TabBar
              tabName={t('followers')}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              setFullName={setFullName}
              tabKey={ProfileTabKey.FOLLOWERS}
            />
            <TabBar
              tabName={t('following')}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              setFullName={setFullName}
              tabKey={ProfileTabKey.FOLLOWING}
            />
          </div>
          <Search fullName={fullName} onSearchChange={setFullName} />
          <div>
            {activeTab === ProfileTabKey.FOLLOWERS && <Follower fullName={fullName} />}
            {activeTab === ProfileTabKey.FOLLOWING && <Following fullName={fullName} />}
          </div>
        </main>
      </div>
    </>
  );
};
export default ProfileFollow;
