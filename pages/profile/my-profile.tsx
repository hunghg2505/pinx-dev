import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MenuProfile = dynamic(() => import('@components/MenuProfile'), {
  ssr: false,
});
const BackLayout = dynamic(() => import('@layout/BackLayout'));
const Profile = (props: any) => {
  return (
    <>
      <MenuProfile {...props} />
    </>
  );
};
Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <BackLayout title='my_profile'>
      <>{page}</>
    </BackLayout>
  );
};

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
      // Will be passed to the page component as props
    },
  };
}

export default Profile;
