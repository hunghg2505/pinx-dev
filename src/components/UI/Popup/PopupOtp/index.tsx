import React from 'react';

import 'rc-dialog/assets/index.css';
import Dialog from 'rc-dialog';

import OtpVerification from '@components/Auth/Register/OtpVerification';
import { deleteRegisterCookies } from '@store/auth';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalRegisterOtp = (props: IProps) => {
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
        <OtpVerification isModal />
      </Dialog>
    </>
  );
};
export default ModalRegisterOtp;
