import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const Explore = dynamic(() => import('@components/Explore'), {
  ssr: false,
});
const MainLayout = dynamic(() => import('@layout/MainLayout'));
const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <div>
        <Explore />
        <div>content right</div>
      </div>
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
