import { useMount } from 'ahooks';

const AppLayout = ({ children, InterFont }: any) => {
  useMount(() => {
    console.log('App Running 11');
  });

  return (
    <>
      <main className={InterFont.variable}>{children}</main>
    </>
  );
};

export default AppLayout;
