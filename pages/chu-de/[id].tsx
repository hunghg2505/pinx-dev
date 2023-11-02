import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import { fetchThemeDetailFromServer } from '@components/Themes/service';
import MainLayout from '@layout/MainLayout';
import { getHostName, toNonAccentVietnamese } from '@utils/common';
import { THEME_DETAIL } from 'src/constant/route';

const ThemeDetail = dynamic(() => import('@components/Themes/ThemeDetail'), {
  ssr: false,
});

const PostDetailPage = ({ themeDetail, host }: any) => {
  const { i18n } = useTranslation();
  const seoMetaData = themeDetail?.seoMetadata;
  const slug =
    themeDetail?.code +
    '-chu-de-' +
    toNonAccentVietnamese(themeDetail?.name).toLowerCase().replaceAll(' ', '-');
  return (
    <>
      <SEO
        siteUrl={`${host}${THEME_DETAIL(slug)}`}
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
  const code = params?.id.split('-')[0];
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
