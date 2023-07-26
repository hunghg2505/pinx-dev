import React from 'react';

import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation();
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
          {t('close_account.title')}
        </Text>
        <Text type='body-14-regular' className='mb-4'>
          {t('close_account.description')}
        </Text>

        <div className='border-b-[1px] border-solid border-[#E6E6E6]' />

        <div className='mt-4 flex justify-between'>
          <div className='w-[49%]'>
            <NegativeButton onClick={handleClose} className='w-full'>
              {t('cancel')}
            </NegativeButton>
          </div>
          <div className='w-[49%]'>
            <PositiveButton className='w-full' onClick={() => requestDeactivateAccout.run()}>
              {t('confirm')}
            </PositiveButton>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default PopupConfirmDeactivateAccount;
