import React from 'react';

import Modal from '@components/UI/Modal/Modal';
import { deleteRegisterCookies } from '@store/auth';

import CreateUsername from '../../../Auth/Register/CreateUsername';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalRegisterCreateUsername = (props: IProps) => {
  const { visible, onClose } = props;

  const handleClose = () => {
    deleteRegisterCookies();
    onClose();
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose}>
        <CreateUsername isModal />
      </Modal>
    </>
  );
};
export default ModalRegisterCreateUsername;
