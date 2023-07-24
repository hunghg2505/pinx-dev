import ModalComposeMobile from '@components/Compose/ModalComposeMobile';
import FooterSignUp from '@components/FooterSignup';
import HomeNewFeed from '@components/Home/HomeNewFeed/HomeNewFeed';
import PopupHomeNoti from '@components/Home/PopupHomeNoti/PopupHomeNoti';

import ComposeButton from './ComposeButton';

const Home = ({ pinPostData }: any) => {
  return (
    <>
      <PopupHomeNoti />

      <HomeNewFeed pinPostDataInitial={pinPostData} />

      <ModalComposeMobile>
        <ComposeButton />
      </ModalComposeMobile>

      <FooterSignUp />
    </>
  );
};

export default Home;
