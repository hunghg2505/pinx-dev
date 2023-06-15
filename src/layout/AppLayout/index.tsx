const AppLayout = ({ children, InterFont }: any) => {
  return (
    <>
      <main className={InterFont.variable}>{children}</main>
    </>
  );
};

export default AppLayout;
