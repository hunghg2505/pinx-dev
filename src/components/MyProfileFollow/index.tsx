import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop';

import Back from './Back';
import Search from './Search';
import TabBar from './TabBar';

const Follower = dynamic(() => import('./Follower'), { ssr: false });
const Following = dynamic(() => import('./Following'), { ssr: false });
const ProfileFollow = () => {
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
      <div className='relative bg-white '>
        <header className='mb-[24px] flex px-[16px] py-[16px] align-middle text-[16px]'>
          <Back />
        </header>
        <main className='px-[16px]'>
          <div
            className='mb-[16px] flex gap-[32px]
          galaxy-max:justify-between galaxy-max:gap-0 '
          >
            <TabBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabKey={ProfileTabKey.FOLLOWERS}
              setFullName={setFullName}
              tab={tab}
            />
            <TabBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabKey={ProfileTabKey.FOLLOWING}
              setFullName={setFullName}
              tab={tab}
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
