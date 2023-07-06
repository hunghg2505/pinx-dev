import classNames from 'classnames';

import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';

const AppLayout = ({ children, InterFont }: any) => {
  usePostThemeInitial();
  return (
    <>
      <main className={classNames(InterFont.variable)}>{children}</main>
      <div id='md-popup-container'></div>
    </>
  );
};

export default AppLayout;
