import React from 'react';

import FooterSignUp from '@components/FooterSignup';
import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
import PopupHomeNoti from '@components/Home/PopupHomeNoti/PopupHomeNoti';

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
