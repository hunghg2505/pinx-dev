import React from 'react';

import OtpVerification from '@components/Auth/Register/OtpVerification';
import Modal from '@components/UI/Modal/Modal';
import { deleteRegisterCookies } from '@store/auth';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalRegisterOtp = (props: IProps) => {
  const { visible, onClose } = props;

  const handleClose = () => {
    deleteRegisterCookies();
    onClose();
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose}>
        <OtpVerification isModal />
      </Modal>
    </>
  );
};
export default ModalRegisterOtp;
