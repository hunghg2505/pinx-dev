import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PinexTop20 from '@components/PinexTop20';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

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
