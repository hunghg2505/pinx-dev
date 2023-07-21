import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));
const ThemeDetail = dynamic(() => import('@components/Themes/ThemeDetail'), {
  ssr: false,
});
const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <ThemeDetail />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ExploreLayout>
      <>{page}</>
    </ExploreLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  // const id = params?.id;
  // // const token = getCookie('accessToken', { req, res });
  // const dataOrderDetail = await serviceGetThemeDetailFromServer(`${id}`, ctx);
  // // const data = await requestCommunity.get(API_PATH.PUBLIC_GET_LIST_ACTIVITIES('T001'));
  // // console.log('🚀 ~ file: [id].tsx:31 ~ getServerSideProps ~ token:', data);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
