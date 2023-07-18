import dynamic from 'next/dynamic';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Redirect = dynamic(() => import('@components/Redirect'), {
  ssr: false,
});
const Header = dynamic(() => import('@layout/components/MainHeader'), {
  ssr: false,
});
const HomePage = () => {
  return (
    <>
      <Head>
        <meta name='theme-color' content='#ffffff'></meta>
      </Head>
      <Header />
      <Redirect />
    </>
  );
};
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
