import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import TopMention from '@components/TopMention';
import MainLayout from '@layout/MainLayout';

const TopMentionPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <TopMention />
    </>
  );
};
TopMentionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default TopMentionPage;
