import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ChangePasswordVertification = dynamic(
  () => import('@components/Setting/ChangePassword/OtpVerification'),
);

const ChangePasswordVerificationPage = () => {
  return (
    <div>
      <ChangePasswordVertification />
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
export default ChangePasswordVerificationPage;
