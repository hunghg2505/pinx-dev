import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ChangeUsernameVertification from '@components/Setting/ChangeUsername/OtpVerification';

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
