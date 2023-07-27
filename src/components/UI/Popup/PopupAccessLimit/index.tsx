import React from 'react';

import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { popupStatusAtom } from '@store/popup/popup';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalAuth = (props: IProps) => {
  const { t } = useTranslation('common');
  const { visible, onClose } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = () => {
    setPopupStatus({
      ...popupStatus,
      popupAccessLinmit: false,
      popupAuth: true,
    });
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose}>
        <div className=''>
          <Text type='body-20-bold' color='neutral-1' className='mb-[12px] text-center'>
            {t('access_limited')}
          </Text>
          <Text type='body-16-regular' color='primary-5' className='mb-[24px] text-center'>
            {t('access_limited_content')}
          </Text>
          <div className='flex gap-x-[13px]'>
            <div
              className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] border-[1px] border-solid border-[#B1D5F1] bg-[var(--primary-03,_#EAF4FB)]'
              onClick={handleClose}
            >
              <Text type='body-16-bold' color='primary-2'>
                {t('cancel')}
              </Text>
            </div>
            <div
              className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)]'
              onClick={onSubmit}
            >
              <Text type='body-16-bold' color='cbwhite'>
                {t('ok')}
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalAuth;
