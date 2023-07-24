import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import GiftCash from '@components/GiftCash';
import SEO from '@components/SEO';

const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));
const GiftCashPage = () => {
  return (
    <>
      <SEO title={'Pinex Gift cash'} />
      <GiftCash />
    </>
  );
};
GiftCashPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ExploreLayout>
      <>{page}</>
    </ExploreLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'giftCash'])),
      // Will be passed to the page component as props
    },
  };
}

export default GiftCashPage;
