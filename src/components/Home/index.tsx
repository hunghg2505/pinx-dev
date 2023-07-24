import { useRef } from 'react';

import dynamic from 'next/dynamic';

import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
import { getAccessToken } from '@store/auth';

import ModalCompose from './ModalCompose';

const PopupHomeNoti = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'), {
  ssr: false,
});
const FooterSignUp = dynamic(() => import('@components/FooterSignup'), {
  ssr: false,
});
const ComposeButton = dynamic(() => import('./ComposeButton'), {
  ssr: false,
});

const Home = () => {
  const refModal: any = useRef();
  const refHomeFeed: any = useRef();

  const isLogin = !!getAccessToken();

  const addPostSuccess = () => {
    refHomeFeed.current?.addPostSuccess && refHomeFeed.current?.addPostSuccess();
  };

  return (
    <>
      <HomeNewFeed ref={refHomeFeed} />

      <ComposeButton />

      <ModalCompose ref={refModal} refresh={addPostSuccess} />

      <PopupHomeNoti />

      {!isLogin && <FooterSignUp />}
    </>
  );
};

export default Home;
