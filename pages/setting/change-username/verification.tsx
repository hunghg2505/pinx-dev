import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ChangeUsernameVertification = dynamic(
  () => import('@components/Setting/ChangeUsername/OtpVerification'),
);

const ChangeUsernameVerificationPage = () => {
  return (
    <div>
      <ChangeUsernameVertification />
    </div>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'setting'])),
      // Will be passed to the page component as props
    },
  };
}
export default ChangeUsernameVerificationPage;
