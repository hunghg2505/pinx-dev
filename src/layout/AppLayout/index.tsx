import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';

const AppLayout = ({ children }: any) => {
  usePostThemeInitial();
  return (
    <>
      <main>{children}</main>
      <div id='md-popup-container'></div>
    </>
  );
};

export default AppLayout;
