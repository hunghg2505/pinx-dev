import { ReactElement } from 'react';

import { useHydrateAtoms } from 'jotai/utils';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { API_PATH } from '@api/constant';
import { requestCommunity } from '@api/request';
import { atomSSRPinPost } from '@store/pinPost/pinPost';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home = dynamic(() => import('@components/Home'));
const SEO = dynamic(() => import('@components/SEO'));
const MainLayout = dynamic(() => import('@layout/MainLayout'));
const Schema = dynamic(() => import('@components/SEO/Schema'));

const homePageKW = [
  'Cộng đồng đầu tư chứng khoán PineX',
  'Nền tảng giao dịch chứng khoán của CK Pinetree - Hàn Quốc',
  '0 phí giao dịch trọn đời, nhiều khuyến mại hấp dẫn',
  'cộng đồng nhà đầu tư',
  'Bản tin',
  'Ngôi sao đầu tư',
  'Chủ đề',
  'Khám phá',
  'Quà tặng',
  'Danh mục theo dõi',
  'tài sản',
  'Cài đặt',
  'Thị trường',
  'Xu hướng',
];

const schema = {
  '@context': 'https://schema.org/',
  '@type': 'WebPage',
  name: 'PineX - Cộng đồng đầu tư chứng khoán',
  url: 'https://pinex.vn/',
  description:
    'Nền tảng giao dịch chứng khoán của CK Pinetree - Hàn Quốc. 0 phí giao dịch trọn đời, nhiều khuyến mại hấp dẫn, cộng đồng nhà đầu tư',
};

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

export async function getStaticProps({ locale }: any) {
  const responsePinnedPost = await requestCommunity.get(API_PATH.PUBLIC_PINNED_POST);

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'profile', 'theme'])),
      dataSSRPinPost: responsePinnedPost?.data?.length ? responsePinnedPost?.data?.slice(0, 1) : [],
      // Will be passed to the page component as props
      revalidate: 10,
    },
  };
}

export default HomePage;
