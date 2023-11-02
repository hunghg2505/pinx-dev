import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { getHostName } from '@utils/common';
import { GIFTCASH } from 'src/constant/route';

const GiftCash = dynamic(() => import('@components/GiftCash'));

const GiftCashPage = ({ host }: { host: string }) => {
  return (
    <>
      <SEO title={'Pinex Gift cash'} siteUrl={`${host}${GIFTCASH}`} />
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

export async function getServerSideProps({ locale, req }: any) {
  const host = getHostName(req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'giftCash'])),
      // Will be passed to the page component as props
      host,
    },
  };
}

export default GiftCashPage;
