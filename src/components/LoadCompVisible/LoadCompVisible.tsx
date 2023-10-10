import React, { useRef } from 'react';

import useIsVisible from '@hooks/useIsVisible';

interface IPropsLoadCompVisible {
  children: React.ReactNode;
}

const LoadCompVisible = (props: IPropsLoadCompVisible) => {
  const elemRef: any = useRef();
  const isVisible = useIsVisible(elemRef);

  return <div ref={elemRef}>{isVisible && props.children}</div>;
};

export default LoadCompVisible;
