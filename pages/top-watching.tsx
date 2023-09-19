import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import { fetchSeoDataFromServer } from '@components/Themes/service';
import MainLayout from '@layout/MainLayout';
import { SEO_TEXT_SEARCH } from 'src/constant';

const TopWatching = dynamic(() => import('@components/TopWatching'));

const TopWatchingPage = ({ seoMetadata }: any) => {
  const { i18n } = useTranslation();

  return (
    <>
      <SEO
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
      <TopWatching />
    </>
  );
};
TopWatchingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  const dataSeo = await fetchSeoDataFromServer(SEO_TEXT_SEARCH.TOP_WATCHING_PAGE);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      seoMetadata: dataSeo?.data?.seoMetadata,
      // Will be passed to the page component as props
    },
  };
}

export default TopWatchingPage;
