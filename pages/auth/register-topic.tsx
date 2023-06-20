import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterTopicStep from '@components/Auth/Register/TopicStep';

const RegisterTopicStepPage = () => {
  return (
    <div>
      <RegisterTopicStep />
    </div>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      // Will be passed to the page component as props
    },
  };
}

export default RegisterTopicStepPage;
