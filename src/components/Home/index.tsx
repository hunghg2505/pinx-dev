import dynamic from 'next/dynamic';

import ModalComposeMobile from '@components/Compose/ModalComposeMobile';
import FooterSignUp from '@components/FooterSignup';
// import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
import PopupHomeNoti from '@components/Home/PopupHomeNoti/PopupHomeNoti';

import ComposeButton from './ComposeButton';

const HomeNewFeed = dynamic(() => import('@components/Home/HomeNewFeed/HomeNewFeed'), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      <PopupHomeNoti />

      <HomeNewFeed />

      <ModalComposeMobile>
        <ComposeButton />
      </ModalComposeMobile>

      <FooterSignUp />
    </>
  );
};

export default Home;
