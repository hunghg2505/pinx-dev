import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const ProfileSearch = dynamic(() => import('@components/ProfileSearch'));

const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Profile Search'} />
      <ProfileSearch />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
 
export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'profile'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
