import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { createSearchSeoFromServer } from '@components/SearchSeo/service';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { getHostName, ROUTE_PATH } from '@utils/common';
import { removeSpecialCharacter } from '@utils/removeSpecialChar';

const SearchSeo = dynamic(() => import('@components/SearchSeo'));

const SearchBar = ({
  host,
  urlParams,
  seoMetadata,
}: {
  host: string;
  urlParams: string;
  seoMetadata: any;
}) => {
  const { i18n } = useTranslation();

  return (
    <>
      <SEO
        title={seoMetadata?.title}
        siteUrl={`${host}${ROUTE_PATH.SEARCHSEO}${urlParams}`}
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
      <SearchSeo />
    </>
  );
};
SearchBar.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};
export async function getServerSideProps({ locale, query, req }: any) {
  const keyword = query?.keyword;
  const response = await createSearchSeoFromServer(removeSpecialCharacter(keyword));
  const host = getHostName(req.headers);

  const params: any = Object.keys(query as object)?.reduce((res, item) => {
    res = {
      ...res,
      [item]: query[item],
    };

    return res;
  }, {});

  let urlParams = new URLSearchParams(params).toString();
  urlParams = urlParams.length > 0 ? `?${urlParams}` : '';

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'search-seo'])),
      // Will be passed to the page component as props
      host,
      urlParams,
      seoMetadata: response?.data?.seoMetadata,
    },
  };
}
export default SearchBar;
