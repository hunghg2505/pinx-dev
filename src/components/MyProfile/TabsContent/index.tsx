import React, { useEffect, useState } from 'react';

// import Desktop from './Desktop';
// import Mobile from './Mobile';
import dynamic from 'next/dynamic';

const Desktop = dynamic(() => import('./Desktop'), { ssr: false });
const Mobile = dynamic(() => import('./Mobile'), { ssr: false });

const TabsContent = () => {
  const [state, setState] = useState({ mobile: false });

  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);

  return <div>{state.mobile ? <Mobile /> : <Desktop />}</div>;
};

export default TabsContent;
