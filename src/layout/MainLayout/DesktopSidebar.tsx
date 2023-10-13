import React from 'react';

import dynamic from 'next/dynamic';

import { useResponsive } from '@hooks/useResponsive';

// import SideBar from './SideBar';
const SideBar = dynamic(() => import('./SideBar'));

const DesktopSidebar = () => {
  const { isMobile } = useResponsive();
  return isMobile ? <></> : <SideBar />;
};

export default DesktopSidebar;
