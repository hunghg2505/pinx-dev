import React from 'react';

import { useAtom } from 'jotai';

import DeactivateAccount from '@components/MenuProfile/ProfileVerification/DeactivateAccont';
import Modal from '@components/UI/Modal/Modal';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';

interface IProps {
  visible: boolean;
}

const PopupDeactivateAccount = (props: IProps) => {
  const { visible } = props;
  const [, setPopupStatus] = useAtom(popupStatusAtom);

  const handleClose = () => {
    setPopupStatus(initialPopupStatus);
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose} closeIcon={<></>}>
        <DeactivateAccount isPopup />
      </Modal>
    </>
  );
};
export default PopupDeactivateAccount;
