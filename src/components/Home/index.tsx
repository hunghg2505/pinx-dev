import dynamic from 'next/dynamic';

const ComposeButton = dynamic(() => import('./ComposeButton'));
const PopupHomeNoti = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'));
const FooterSignUp = dynamic(() => import('@components/FooterSignup'));
const ModalComposeMobile = dynamic(() => import('@components/Compose/ModalComposeMobile'));
const HomeNewFeed = dynamic(() => import('@components/Home/HomeNewFeed/HomeNewFeed'));
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
