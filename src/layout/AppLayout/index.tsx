import classNames from 'classnames';

const AppLayout = ({ children, InterFont }: any) => {
  return (
    <>
      <main className={classNames(InterFont.variable)}>{children}</main>
    </>
  );
};

export default AppLayout;
