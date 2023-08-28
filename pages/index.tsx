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
      <SEO
        title='Cộng đồng đầu tư chứng khoán PineX'
        description='Nền tảng giao dịch chứng khoán của CK Pinetree - Hàn Quốc. 0 phí giao dịch trọn đời, nhiều khuyến mại hấp dẫn, cộng đồng nhà đầu tư'
      />
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
