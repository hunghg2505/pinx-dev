import React from 'react';

import dynamic from 'next/dynamic';

// import SideBar from './SideBar';
const SideBar = dynamic(() => import('./SideBar'));

const DesktopSidebar = () => {
  return <SideBar />;
};

export default DesktopSidebar;
