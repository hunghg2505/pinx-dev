import React from 'react';

import dynamic from 'next/dynamic';

import Skeleton from '@components/UI/Skeleton';

const ComposeButton = dynamic(() => import('./ComposeButton'));
const PopupHomeNoti = dynamic(() => import('@components/Home/PopupHomeNoti/PopupHomeNoti'));
const FooterSignUp = dynamic(() => import('@components/FooterSignup'));
const ModalComposeMobile = dynamic(() => import('@components/Compose/ModalComposeMobile'));
const HomeNewFeed = dynamic(() => import('@components/Home/HomeNewFeed/HomeNewFeed'));
const Home = ({ pinPostData }: any) => {
  // Fix Error: Hydration failed because the initial UI does not match what was rendered on the server.
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    },0);
  }, []);

  // For Next.js 13, return jsx once the component is mounted
  if (!mounted) {
    return <Skeleton/>;
  }

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
