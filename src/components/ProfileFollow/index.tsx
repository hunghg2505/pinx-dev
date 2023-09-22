import React, { useState } from 'react';

import dynamic from 'next/dynamic';

import ModalPage from '@components/ModalPage';
import { ProfileTabKey } from '@components/MyProfile/TabsContent/Desktop';

import Back from './Back';
import Search from './Search';
import TabBar from './TabBar';

const Follower = dynamic(() => import('./Follower'));
const Following = dynamic(() => import('./Following'));
const ProfileFollow = () => {
  const [fullName, setFullName] = useState('');
  const [activeTab, setActiveTab] = useState<string>(ProfileTabKey.FOLLOWERS);

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
              activeTab={activeTab}
              onTabChange={setActiveTab}
              setFullName={setFullName}
              tabKey={ProfileTabKey.FOLLOWERS}
            />
            <TabBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              setFullName={setFullName}
              tabKey={ProfileTabKey.FOLLOWING}
            />
          </div>
          <Search onSearchChange={setFullName} />
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
