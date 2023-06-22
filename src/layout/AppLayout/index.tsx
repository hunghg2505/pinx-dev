import { useMount } from 'ahooks';

const AppLayout = ({ children, InterFont }: any) => {
  useMount(() => {
    console.log('App Running 11 222');
  });

  return (
    <>
      <main className={InterFont.variable}>{children}</main>
    </>
  );
};

export default AppLayout;
