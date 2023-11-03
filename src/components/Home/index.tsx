/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import dynamic from 'next/dynamic';

// import TabMobile from '@components/Home/HomeNewFeed/TabMobile';
import lazyLoadHydrate from '@components/LazyComp/LazyComp';

// import FooterSignUp from '@components/FooterSignup';
// import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
// import PopupHomeNoti from '@components/Home/PopupHomeNoti/PopupHomeNoti';

const PopupHomeNoti = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'), {
  ssr: false,
});
const FooterSignUp = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'), {
  ssr: false,
});
const HomeNewFeed = dynamic(() => import('@components/Home/HomeNewFeed/HomeNewFeed'));
const TabMobile = lazyLoadHydrate(() => import('@components/Home/HomeNewFeed/TabMobile'), true);

const Home = () => {
  return (
    <>
      <div className='relative tablet:hidden [&>section]:h-full'>
        <TabMobile />
      </div>
      <HomeNewFeed />

      <PopupHomeNoti />

      <FooterSignUp />
    </>
  );
};

export default Home;
