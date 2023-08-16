import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import HeaderMobile from '@components/common/HeaderMobile';

import Back from './Back';
import Search from './Search';
import TabBar from './TabBar';

const Follower = dynamic(() => import('./Follower'));
const Following = dynamic(() => import('./Following'));
const ProfileFollow = () => {
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState('');

  return (
    <>
      <HeaderMobile />
      <div className='relative bg-white '>
        <header className='mb-[24px] flex px-[16px] py-[16px] align-middle text-[16px]'>
          <Back />
        </header>
        <main className='px-[16px]'>
          <div className='mb-[16px] flex gap-[32px] galaxy-max:gap-[20px] '>
            <TabBar tabKey='followers' />
            <TabBar tabKey='following' />
          </div>
          <Search onSearchChange={setFullName} />
          <div>
            {searchParams.get('tab') === 'followers' && <Follower fullName={fullName} />}
            {searchParams.get('tab') === 'following' && <Following fullName={fullName} />}
          </div>
        </main>
      </div>
    </>
  );
};
export default ProfileFollow;
