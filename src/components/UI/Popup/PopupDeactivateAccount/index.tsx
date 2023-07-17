import React from 'react';

import 'rc-dialog/assets/index.css';
import { useAtom } from 'jotai';
import Dialog from 'rc-dialog';

import DeactivateAccount from '@components/MenuProfile/ProfileVerification/DeactivateAccont';
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
      <Dialog visible={visible} onClose={handleClose} closeIcon={<></>}>
        <DeactivateAccount isPopup />
      </Dialog>
    </>
  );
};
export default PopupDeactivateAccount;
