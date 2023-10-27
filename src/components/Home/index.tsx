import React from 'react';

import FooterSignUp from '@components/FooterSignup';
import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
import PopupHomeNoti from '@components/Home/PopupHomeNoti/PopupHomeNoti';

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
