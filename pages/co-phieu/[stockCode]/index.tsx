import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import { fetchStockDetailFromServer } from '@components/Stock/service';
import MainLayout from '@layout/MainLayout';
import { ROUTE_PATH, getHostName } from '@utils/common';

const StockDetail = dynamic(() => import('@components/Stock/StockDetail'), {
  ssr: false,
});

const StockDetailPage = ({ seoMetaData, host }: any) => {
  const { i18n } = useTranslation();
  const id = seoMetaData.slug.split('/')[1];
  return (
    <>
      <SEO
        siteUrl={`${host}${ROUTE_PATH.STOCK_DETAIL(id)}`}
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

export async function getServerSideProps({ locale, params, req }: any) {
  const code = params?.stockCode.split('-');
  const stockCode = code[0].toUpperCase();
  const dataStock = await fetchStockDetailFromServer(stockCode);
  const host = getHostName(req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'stock'])),
      seoMetaData: dataStock?.data?.details?.seoMetadata,
      // Will be passed to the page component as props
      host,
      stockCode,
    },
  };
}

export default StockDetailPage;
