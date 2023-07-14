import { ReactElement } from 'react';

import { parseJwt } from 'brainless-token-manager';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MenuProfile = dynamic(() => import('@components/MenuProfile'));
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

export async function getServerSideProps({ locale, req }: GetServerSidePropsContext) {
  if (typeof req.cookies?.accessToken !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const decoded = parseJwt(req.cookies?.accessToken);
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common','profile'])),
      ...decoded,
      // Will be passed to the page component as props
    },
  };
}

export default Profile;
