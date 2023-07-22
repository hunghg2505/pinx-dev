import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import Setting from '@components/Setting';

const SettingLayout = dynamic(() => import('@layout/SettingLayout'));
const Setting = dynamic(() => import('@components/Setting'), {
  ssr: false,
});

const SettingPage = () => {
  return (
    <div>
      <Setting />
    </div>
  );
};

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingLayout>
      {page}
    </SettingLayout>
  );
};

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(req.cookies.locale || 'en', ['common', 'setting'])),
      // Will be passed to the page component as props
    },
  };
}

export default SettingPage;
