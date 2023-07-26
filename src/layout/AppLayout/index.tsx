const AppLayout = ({ children }: any) => {
  return (
    <>
      <main className='App'>{children}</main>
      <div id='md-popup-container'></div>
    </>
  );
};

export default AppLayout;
