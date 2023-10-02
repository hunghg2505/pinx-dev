import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import { fetchSeoDataFromServer } from '@components/Themes/service';
import MainLayout from '@layout/MainLayout';
import { ROUTE_PATH, getHostName } from '@utils/common';
import { SEO_TEXT_SEARCH } from 'src/constant';

const Themes = dynamic(() => import('@components/Themes'));

const ThemesPage = ({ seoMetadata, host }: any) => {
  const { i18n } = useTranslation();
  return (
    <>
      <SEO
        siteUrl={`${host}${ROUTE_PATH.THEME}`}
        title={seoMetadata?.title}
        description={seoMetadata?.metaDescription}
        openGraph={{
          locale: i18n.language,
          images: {
            url: seoMetadata?.imageSeo?.urlImage,
          },
        }}
        twitterGraph={{
          images: {
            url: seoMetadata?.imageSeo?.urlImage,
          },
        }}
        keywords={seoMetadata?.keyphrase}
      />
      <Themes />
    </>
  );
};
ThemesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale, req }: any) {
  const dataSeo = await fetchSeoDataFromServer(SEO_TEXT_SEARCH.EXPLORE_PAGE);
  const host = getHostName(req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'theme'])),
      seoMetadata: dataSeo?.data?.seoMetadata,
      // Will be passed to the page component as props
      host,
    },
  };
}

export default ThemesPage;
