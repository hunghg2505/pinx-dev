import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchPinedPostFromServer } from '@components/Home/service';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const Home = dynamic(() => import('@components/Home'));

const HomePage = ({ pinPostData }: any) => {
  return (
    <>
      <SEO title={'Pinex'} />
      <Home pinPostData={pinPostData} />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  const pinPostData = await fetchPinedPostFromServer();

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'profile', 'theme'])),
      // Will be passed to the page component as props
      pinPostData,
    },
  };
}

export default HomePage;
