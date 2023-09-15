import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const PinexTop20 = dynamic(() => import('@components/PinexTop20'));

const PinexTop20Page = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'theme', 'explore'])),
      // Will be passed to the page component as props
    },
  };
}

export default PinexTop20Page;
