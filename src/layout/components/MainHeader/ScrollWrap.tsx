import { useEffect, useRef } from 'react';

import { useAtom } from 'jotai';

import { openProfileAtom } from '@store/profile/profile';
import { useSidebarMobile } from '@store/sidebarMobile/sidebarMobile';

interface IPropsScrollWrap {
  children: any;
}

const ScrollWrap = ({ children }: IPropsScrollWrap) => {
  const refHeader: any = useRef(null);
  const [openProfileMenu] = useAtom(openProfileAtom);
  const [sidebarMobile] = useSidebarMobile();

  useEffect(() => {
    let lastScrollTop = 0;

    const onScroll = () => {
      if (window?.innerWidth > 600) {
        return;
      }

      if (sidebarMobile || openProfileMenu) {
        return;
      }

      const st = window?.pageYOffset || document.documentElement.scrollTop;

      if (st > lastScrollTop) {
        refHeader.current?.classList.add('headerHide');
      } else if (st < lastScrollTop) {
        refHeader.current?.classList.remove('headerHide');
      }

      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or nega
    };

    document.addEventListener('scroll', onScroll, { passive: true });
    // document.addEventListener('touchmove', onScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', onScroll);
      // document.removeEventListener('touchmove', onScroll);
    };
  });

  return (
    <div
      className=' sticky left-0 top-0 z-[999] border-b-[1px] border-solid border-[#EBEBEB] bg-white transition-all duration-[350ms] ease-in-out  desktop:h-[84px]'
      ref={refHeader}
    >
      {children}
    </div>
  );
};

export default ScrollWrap;
