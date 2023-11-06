import React from 'react';

import FooterSignUp from '@components/FooterSignup';
import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
import PopupHomeNoti from '@components/Home/PopupHomeNoti/PopupHomeNoti';
import '@splidejs/react-splide/css';

const Home = () => {
  return (
    <>
      <PopupHomeNoti />

      <HomeNewFeed />

      <FooterSignUp />
    </>
  );
};

export default Home;
