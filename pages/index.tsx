/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement } from 'react';

import { useHydrateAtoms } from 'jotai/utils';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PUBLIC_PINNED_POST } from '@api/constant';
import { requestCommunity } from '@api/request';
import { atomSSRPinPost } from '@store/pinPost/pinPost';
import { homePageKW, schema } from 'src/constant';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home = dynamic(() => import('@components/Home'));
const SEO = dynamic(() => import('@components/SEO'));
const MainLayout = dynamic(() => import('@layout/MainLayout'));
const Schema = dynamic(() => import('@components/SEO/Schema'), { ssr: false });

const HomePage = ({ dataSSRPinPost }: any) => {
  useHydrateAtoms([[atomSSRPinPost, dataSSRPinPost]]);

  return (
    <>
      <SEO
        title='Cộng đồng đầu tư chứng khoán PineX'
        description='Nền tảng giao dịch chứng khoán của CK Pinetree - Hàn Quốc. 0 phí giao dịch trọn đời, nhiều khuyến mại hấp dẫn, cộng đồng nhà đầu tư'
        keywords={homePageKW}
      />
      <Schema schema={schema} />
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

export async function getServerSideProps({ locale }: any) {
  const responsePinnedPost = await requestCommunity.get(PUBLIC_PINNED_POST);

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'profile', 'theme'])),
      dataSSRPinPost: responsePinnedPost?.data?.length ? responsePinnedPost?.data?.slice(0, 1) : [],
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
