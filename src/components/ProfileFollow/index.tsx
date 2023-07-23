import React from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import ModalPage from '@components/ModalPage';

import Back from './Back';
// import NotFound from './NotFound';
import Search from './Search';
import TabBar from './TabBar';

const Follower = dynamic(() => import('./Follower'));
const Following = dynamic(() => import('./Following'));
const ProfileFollow = () => {
  const searchParams = useSearchParams();
  return (
    <div className='bg-white'>
      <ModalPage />
      <header className='mb-[24px] flex px-[16px] py-[16px] align-middle text-[16px]'>
        <Back />
      </header>
      <main className='px-[16px]'>
        <div className='mb-[20px] flex gap-[32px] '>
          <TabBar tabKey='followers' />
          <TabBar tabKey='following' />
        </div>
        <Search />
        <div>
          {searchParams.get('tab') === 'followers' && <Follower />}
          {searchParams.get('tab') === 'following' && <Following />}
        </div>
      </main>
    </div>
  );
};
export default ProfileFollow;
