import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import { fetchThemeDetailFromServer } from '@components/Themes/service';
import MainLayout from '@layout/MainLayout';
import { ROUTE_PATH, getHostName } from '@utils/common';

const ThemeDetail = dynamic(() => import('@components/Themes/ThemeDetail'), {
  ssr: false,
});

const PostDetailPage = ({ themeDetail, host }: any) => {
  const { i18n } = useTranslation();
  const seoMetaData = themeDetail?.seoMetadata;

  return (
    <>
      <SEO
        siteUrl={`${host}${ROUTE_PATH.THEME_DETAIL(themeDetail?.code)}`}
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
      />
      <ThemeDetail />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale, params, req }: any) {
  const code = params?.id;
  const themeDetail = await fetchThemeDetailFromServer(code);
  const host = getHostName(req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'theme'])),
      themeDetail: themeDetail?.data,
      // Will be passed to the page component as props
      host,
    },
  };
}

export default PostDetailPage;
