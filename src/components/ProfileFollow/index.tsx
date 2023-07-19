import React from 'react';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

import Back from './Back';
// import NotFound from './NotFound';
import Search from './Search';
import TabBar from './TabBar';

const Follower = dynamic(() => import('./Follower'));
const Following = dynamic(() => import('./Following'));
const ProfileFollow = () => {
  const searchParams = useSearchParams();
  return (
    <>
      <header className='mb-[24px] flex px-[16px] py-[16px] align-middle text-[16px]'>
        <Back />
      </header>
      <main className='px-[16px]'>
        <div className='mb-[20px] flex gap-[32px] '>
          <TabBar tabKey='follower' />
          <TabBar tabKey='following' />
        </div>
        <Search />
        <div>
          {searchParams.get('tab') === 'follower' && <Follower />}
          {searchParams.get('tab') === 'following' && <Following />}
        </div>
        {/* <NotFound /> */}
      </main>
    </>
  );
};
export default ProfileFollow;