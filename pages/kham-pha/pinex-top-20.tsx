import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { getHostName } from '@utils/common';
import { PINEX_TOP_20 } from 'src/constant/route';

const PinexTop20 = dynamic(() => import('@components/PinexTop20'));

const PinexTop20Page = ({ host }: { host: string }) => {
  return (
    <>
      <SEO title={'Pinex Detail'} siteUrl={`${host}/${PINEX_TOP_20}`} />
      <PinexTop20 />
    </>
  );
};
PinexTop20Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale, req }: any) {
  const host = getHostName(req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'theme', 'explore'])),
      // Will be passed to the page component as props
      host,
    },
  };
}

export default PinexTop20Page;
