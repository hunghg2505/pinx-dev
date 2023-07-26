import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const ProfileFollow = dynamic(() => import('@components/ProfileFollow'));

const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Profile Search'} />
      <ProfileFollow />
    </>
  );
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
