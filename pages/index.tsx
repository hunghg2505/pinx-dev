import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { fetchPinedPostFromServer } from '@components/Home/service';
import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';
import { FILTER_TYPE } from '@components/Home/ModalFilter/modal-filter';
// import { serviceGetNewFeed } from '@components/Home/service';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home = dynamic(() => import('@components/Home'));

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

const HomePage = ({ pinPosts, filterType, filterData }: any) => {
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
        keywords={homePageKW}
      />
      <Home pinedPosts={pinPosts} filterType={filterType} filterData={filterData} />
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

export async function getServerSideProps({ locale, req, query }: GetServerSidePropsContext) {
  const token = req.cookies.accessToken;
  const isLogin = !!token;

  const [responsePinnedPost, filterData] = await Promise.all([
    isLogin
      ? privateRequest(requestCommunity.get, API_PATH.PRIVATE_PINNED_POST, { token })
      : requestCommunity.get(API_PATH.PUBLIC_PINNED_POST),
    requestCommunity.get(API_PATH.FILTER_LIST),
  ]);
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'profile', 'theme'])),
      // Will be passed to the page component as props
      pinPosts: responsePinnedPost.data || null,
      filterType: query?.filterType || FILTER_TYPE.MOST_RECENT,
      filterData: filterData.data || null,
    },
  };
}

export default HomePage;
