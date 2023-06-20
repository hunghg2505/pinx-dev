import dynamic from 'next/dynamic';

const LoginHeader = dynamic(() => import('../components/LoginHeader'));

const LoginLayout = ({ children }: any) => {
  return (
    <>
      <LoginHeader />
      <main>{children}</main>
    </>
  );
};

export default LoginLayout;
