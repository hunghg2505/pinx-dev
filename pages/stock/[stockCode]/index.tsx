import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import { fetchStockDetailFromServer } from '@components/Stock/service';
import MainLayout from '@layout/MainLayout';

const StockDetail = dynamic(() => import('@components/Stock/StockDetail'), {
  ssr: false,
});

const StockDetailPage = ({ seoMetaData }: any) => {
  const { i18n } = useTranslation();

  return (
    <>
      <SEO
        title={seoMetaData?.title}
        description={seoMetaData?.metaDescription}
        openGraph={{
          locale: i18n.language,
          images: {
            url: seoMetaData?.imageSeo?.urlImage,
          },
        }}
        twitterGraph={{
          images: {
            url: seoMetaData?.imageSeo?.urlImage,
          },
        }}
        keywords={seoMetaData?.keyphrase}
      ></SEO>
      <StockDetail />
    </>
  );
};

StockDetailPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps({ locale, params }: any) {
  const stockCode = params?.stockCode;
  const dataStock = await fetchStockDetailFromServer(stockCode);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'stock'])),
      seoMetaData: dataStock?.data?.details?.seoMetadata,
      // Will be passed to the page component as props
    },
  };
}

export default StockDetailPage;
