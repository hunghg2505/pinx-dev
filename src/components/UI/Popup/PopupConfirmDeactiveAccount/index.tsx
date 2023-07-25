import React from 'react';

import { toast } from 'react-hot-toast';

import { NegativeButton, PositiveButton } from '@components/UI/Button';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useAuth } from '@store/auth/useAuth';

import { useDeactivateAccout } from './service';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const PopupConfirmDeactivateAccount = (props: IProps) => {
  const { visible, onClose } = props;
  const { onLogout } = useAuth();

  const handleClose = () => {
    onClose();
  };

  const requestDeactivateAccout = useDeactivateAccout({
    onSuccess: () => {
      onLogout();
    },
    onError(e) {
      toast(() => <Notification type='error' message={e?.error} />);
    },
  });

  return (
    <>
      <Modal visible={visible} onClose={handleClose} closeIcon={<></>}>
        <Text type='body-20-semibold' className='mb-2'>
          Request close account
        </Text>
        <Text type='body-14-regular' className='mb-4'>
          Would you like to close this account? Our Customer Service Dept will contact you after we
          received your request.
        </Text>

        <div className='border-b-[1px] border-solid border-[#E6E6E6]' />

        <div className='mt-4 flex justify-between'>
          <div className='w-[49%]'>
            <NegativeButton onClick={handleClose} className='w-full'>
              Cancel
            </NegativeButton>
          </div>
          <div className='w-[49%]'>
            <PositiveButton className='w-full' onClick={() => requestDeactivateAccout.run()}>
              Confirm
            </PositiveButton>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default PopupConfirmDeactivateAccount;
