import React from 'react';

import dynamic from 'next/dynamic';

// import FooterSignUp from '@components/FooterSignup';
import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
// import PopupHomeNoti from '@components/Home/PopupHomeNoti/PopupHomeNoti';

const PopupHomeNoti = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'), {
  ssr: false,
});
const FooterSignUp = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'), {
  ssr: false,
});

const Home = ({ pinedPosts, filterType, filterData }: any) => {
  return (
    <>
      <PopupHomeNoti />

      <HomeNewFeed pinedPosts={pinedPosts} filterType={filterType} filterData={filterData} />

      <FooterSignUp />
    </>
  );
};

export default Home;
