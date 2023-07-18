import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PinexTop20 from '@components/PinexTop20';
import SEO from '@components/SEO';

const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));
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
    <ExploreLayout>
      <>{page}</>
    </ExploreLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default PinexTop20Page;
