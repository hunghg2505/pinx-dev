const AppLayout = ({ children }: any) => {
  return (
    <>
      <main>{children}</main>
      <div id='md-popup-container'></div>
    </>
  );
};

export default AppLayout;
