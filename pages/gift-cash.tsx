import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const GiftCash = dynamic(() => import('@components/GiftCash'));

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
