import { atom, useAtom } from 'jotai';

const atomSidebarMobile = atom(false);

export const useSidebarMobile = () => {
  const [sidebarMobile, setSidebarMobile] = useAtom(atomSidebarMobile);

  return [sidebarMobile, setSidebarMobile];
};
