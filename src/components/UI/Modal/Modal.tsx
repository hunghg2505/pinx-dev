import React from 'react';

import classNames from 'classnames';
import type { DialogProps } from 'rc-dialog';
import Dialog from 'rc-dialog';

interface IModal extends DialogProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  closeIcon?: React.ReactNode | string;
  className?: string;
}

const Modal = ({
  children,
  visible,
  onClose,
  closeIcon: closeX,
  className,
  destroyOnClose,
}: IModal) => {
  const closeIcon = closeX || (
    <img
      loading='lazy'
      src='/static/icons/iconClose.svg'
      alt=''
      className='h-[21px] w-[21px] object-contain'
    />
  );

  return (
    <Dialog
      className={classNames(className)}
      visible={visible}
      animation='zoom'
      maskAnimation='fade'
      onClose={onClose}
      closeIcon={<>{closeIcon}</>}
      destroyOnClose={destroyOnClose}
    >
      <>{children}</>
    </Dialog>
  );
};

Modal.displayName = 'CustomModal';

export default Modal;
