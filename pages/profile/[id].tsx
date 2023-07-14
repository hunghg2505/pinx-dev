import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const Profile = dynamic(() => import('@components/Profile'));

const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Profile'} />
      <Profile />
    </>
  );
};
// PostDetailPage.getLayout = function getLayout(page: ReactElement) {
//   return <>{page}</>;
// };

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'profile'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
