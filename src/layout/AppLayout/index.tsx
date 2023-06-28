import { useMount } from 'ahooks';
import classNames from 'classnames';

const AppLayout = ({ children, InterFont }: any) => {
  useMount(() => {
    console.log('App Running 11 222');
  });

  return (
    <>
      <main className={classNames(InterFont.variable)}>{children}</main>
    </>
  );
};

export default AppLayout;
