import { useMount } from 'ahooks';

const AppLayout = ({ children, InterFont }: any) => {
  useMount(() => {
    console.log('App Running');
  });

  return (
    <>
      <main className={InterFont.variable}>{children}</main>
    </>
  );
};

export default AppLayout;
