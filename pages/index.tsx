import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'react-lazy-load-image-component/src/effects/blur.css';

// import { fetchPinedPostFromServer } from '@components/Home/service';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const Home = dynamic(() => import('@components/Home'));

const HomePage = () => {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'WebPage',
    name: 'PineX - Cộng đồng đầu tư chứng khoán',
    url: 'https://pinex.vn/',
    description:
      'Nền tảng giao dịch chứng khoán của CK Pinetree - Hàn Quốc. 0 phí giao dịch trọn đời, nhiều khuyến mại hấp dẫn, cộng đồng nhà đầu tư',
  };
  return (
    <>
      <SEO
        title='Cộng đồng đầu tư chứng khoán PineX'
        description='Nền tảng giao dịch chứng khoán của CK Pinetree - Hàn Quốc. 0 phí giao dịch trọn đời, nhiều khuyến mại hấp dẫn, cộng đồng nhà đầu tư'
        schema={schema}
      />
      <Home />
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
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'profile', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
