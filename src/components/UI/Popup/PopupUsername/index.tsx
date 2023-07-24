import React from 'react';

import Dialog from 'rc-dialog';

import { deleteRegisterCookies } from '@store/auth';

import CreateUsername from '../../../Auth/Register/CreateUsername';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalRegisterCreateUsername = (props: IProps) => {
  const { visible, onClose } = props;

  const renderCloseIcon = (): React.ReactNode => {
    return <img src='/static/icons/close_icon.svg' alt='' />;
  };

  const handleClose = () => {
    deleteRegisterCookies();
    onClose();
  };

  return (
    <>
      <Dialog visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()}>
        <CreateUsername isModal />
      </Dialog>
    </>
  );
};
export default ModalRegisterCreateUsername;
