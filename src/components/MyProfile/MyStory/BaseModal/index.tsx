import React, { ReactNode, forwardRef, memo, useImperativeHandle, useState } from 'react';

import classNames from 'classnames';

export interface IBaseModal {
  open: () => void;
  close: () => void;
}
const BaseModal = forwardRef(({ children }: { children: ReactNode }, ref) => {
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      setRender(false);
    }, 300);
  };
  const open = () => {
    setRender(true);
    setTimeout(() => {
      setVisible(true);
    }, 300);
  };

  useImperativeHandle(ref, () => ({ close, open }));

  return (
    <>
      {render && (
        <div
          className={classNames(
            'fixed left-0 top-0 z-[9999] flex bottom-0 right-0 items-center justify-center py-6 duration-300 ease-in-out',
            { 'bg-[black]/[0.35]': visible },
          )}
        >
          <div
            className={classNames('z-50 max-h-full overflow-auto duration-300 ease-in-out', {
              'scale-0': !visible,
            })}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
});

export default memo(BaseModal);