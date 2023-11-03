/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import ContentRightFake from '@components/Home/ContentRight/ContentRightFake';
import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import { useRouteSetting } from '@hooks/useRouteSetting';
import MainHeaderFake from '@layout/components/MainHeader/MainHeaderFake';
import SideBarFake from '@layout/MainLayout/SideBar/SideBarFake';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';

import styles from './index.module.scss';

const MainHeader = dynamic(() => import('../components/MainHeader'), {
  loading: () => <MainHeaderFake />,
});

const ModalPage = dynamic(() => import('@components/ModalPage'), {
  ssr: false,
});
const SideBar = dynamic(() => import('./SideBar'), {
  loading: () => <SideBarFake />,
});
const ContentRight = lazyLoadHydrate(
  () => import('@components/Home/ContentRight'),
  false,
  () => <ContentRightFake />,
);

const LayoutSideBar = ({ children }: { children: React.ReactNode }) => {
  const [isShowNavigate] = useSidebarMobile();
  const { isRouteSetting } = useRouteSetting();

  return (
    <div className={classNames('desktop:bg-[#F8FAFD] desktop:pt-[25px]')}>
      <div className='mx-auto flex w-full max-w-[1355px] justify-between gap-[24px] desktop:px-0'>
        <div
          className={classNames(
            'max-w-[218px] flex-1 [&>section]:h-full',
            styles.sidebarContainer,
            {
              [styles.sidebarContainerShow]: isShowNavigate,
              [styles.sidebarRouteSetting]: isRouteSetting,
              [styles.sidebarNotRouteSetting]: !isRouteSetting,
            },
          )}
          id='left'
        >
          <SideBar />
        </div>

        {children}
      </div>
    </div>
  );
};

const MainLayout = ({ children }: any) => {
  return (
    <>
      <MainHeader />

      <LayoutSideBar>
        <div className='w-full flex-1 overflow-hidden p-[10px] tablet:p-0'>{children}</div>

        <div
          className='max-w-[350px] flex-1 mobile:hidden tablet:block [&>section]:h-full'
          id='right'
        >
          <ContentRight />
        </div>
      </LayoutSideBar>

      <ModalPage />
    </>
  );
};

export default MainLayout;
