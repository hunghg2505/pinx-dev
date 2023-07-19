import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

const Desktop = dynamic(() => import('./Desktop'));
const Mobile = dynamic(() => import('./Mobile'));

const TabsContent = () => {
  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  return <div className='px-[16px]'>{state.mobile ? <Mobile /> : <Desktop />}</div>;
};
export default TabsContent;
