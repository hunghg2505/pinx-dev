import { useEffect, useState } from 'react';

import { useDebounceFn } from 'ahooks';

export const useResponsive = () => {
  // screen resolutions
  const [state, setState] = useState({
    isMobile: !!(
      typeof window !== 'undefined' &&
      window.innerWidth >= 320 &&
      window.innerWidth <= 1024
    ),
    isDesktop: !!(typeof window !== 'undefined' && window.innerWidth > 1024),
  });

  useEffect(() => {
    // update the state on the initial load
    onResizeHandler();

    // assign the event
    Setup();

    return () => {
      // remove the event
      Cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update the state on window resize
  const onResizeHandler = () => {
    const isMobile = window.innerWidth >= 320 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;

    setState({ isMobile, isDesktop });
  };

  // debounce the resize call
  const { run: debouncedCall } = useDebounceFn(onResizeHandler, {
    wait: 100,
  });

  // add event listener
  const Setup = () => {
    window.addEventListener('resize', debouncedCall, false);
  };

  // remove the listener
  const Cleanup = () => {
    window.removeEventListener('resize', debouncedCall, false);
  };

  return state;
};
