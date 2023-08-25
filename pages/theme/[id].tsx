import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const ThemeDetail = dynamic(() => import('@components/Themes/ThemeDetail'), {
  ssr: false,
});

const PostDetailPage = () => {
  return (
    <>
      <SEO title='Cộng đồng đầu tư chứng khoán PineX' />
      <ThemeDetail />
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
      ...(await serverSideTranslations(locale, ['common', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
