import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RegisterTopicStep = dynamic(() => import('@components/Auth/Register/TopicStep'));

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
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default RegisterTopicStepPage;
