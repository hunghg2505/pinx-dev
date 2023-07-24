import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import GiftCash from '@components/GiftCash';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

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
    <MainLayout>
      <>{page}</>
    </MainLayout>
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
