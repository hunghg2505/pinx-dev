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
