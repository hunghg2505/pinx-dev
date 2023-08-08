import React from 'react';

import dynamic from 'next/dynamic';

const PopupHomeNoti = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'));
const FooterSignUp = dynamic(() => import('@components/FooterSignup'));
const HomeNewFeed = dynamic(() => import('@components/Home/HomeNewFeed/HomeNewFeed'), { ssr: false });
const Home = ({ pinPostData }: any) => {
  return (
    <>
      <PopupHomeNoti />

      <HomeNewFeed pinPostDataInitial={pinPostData} />

      <FooterSignUp />
    </>
  );
};

export default Home;
