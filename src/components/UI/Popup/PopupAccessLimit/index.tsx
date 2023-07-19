import React from 'react';

import 'rc-dialog/assets/index.css';
import { useAtom } from 'jotai';
import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';
import { popupStatusAtom } from '@store/popup/popup';

interface IProps {
  visible: boolean;
  onClose: () => void;
}

const ModalAuth = (props: IProps) => {
  const { visible, onClose } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const renderCloseIcon = (): React.ReactNode => {
    return <img src='/static/icons/close_icon.svg' alt='' />;
  };

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
      <Dialog
        visible={visible}
        onClose={handleClose}
        closeIcon={renderCloseIcon()}
        className='z-50'
      >
        <div className='fixed left-2/4 top-2/4 z-20 mx-[auto] my-[0] -translate-x-1/2 -translate-y-1/2 transform rounded-[8px] bg-[#EAF4FB] p-[24px] mobile:w-[calc(100%_-_32px)] tablet:w-[500px]'>
          <Text type='body-20-bold' color='neutral-1' className='mb-[12px] text-center'>
            Access Limited
          </Text>
          <Text type='body-16-regular' color='primary-5' className='mb-[24px] text-center'>
            You need to log in to use this feature
          </Text>
          <div className='flex gap-x-[13px]'>
            <div
              className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] border-[1px] border-solid border-[#B1D5F1] bg-[var(--primary-03,_#EAF4FB)]'
              onClick={handleClose}
            >
              <Text type='body-16-bold' color='primary-2'>
                Cancel
              </Text>
            </div>
            <div
              className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)]'
              onClick={onSubmit}
            >
              <Text type='body-16-bold' color='cbwhite'>
                OK
              </Text>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalAuth;
