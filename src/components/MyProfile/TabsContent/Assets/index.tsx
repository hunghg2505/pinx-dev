import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import Desktop from './Desktop';

const Mobile = dynamic(() => import('./Mobile'));
const Assets = () => {
  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  if (state.mobile) {
    return <Mobile />;
  }
  return <Desktop />;
};
export default Assets;
