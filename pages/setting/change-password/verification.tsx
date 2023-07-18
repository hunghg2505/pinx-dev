import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ChangePasswordVertification from '@components/Setting/ChangePassword/OtpVerification';

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
