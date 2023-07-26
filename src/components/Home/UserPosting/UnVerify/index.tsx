import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

const Mobile = dynamic(() => import('./Mobile'));
const Desktop = dynamic(() => import('./Desktop'));
const Unverify = ({ close }: { close?: () => void }) => {
  const [state, setState] = useState({ mobile: false });
  useEffect(() => {
    return window.innerWidth >= 768 ? setState({ mobile: false }) : setState({ mobile: true });
  }, []);
  return <>{state.mobile ? <Mobile close={close} /> : <Desktop close={close} />}</>;
};
export default Unverify;
