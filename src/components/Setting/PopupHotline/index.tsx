import React from 'react';

import Modal from '@components/UI/Modal/Modal';

import styles from './index.module.scss';

interface IProps {
  visible: boolean;
  closeIcon?: React.ReactNode;
  onToggle: () => void;
}

const PopupHotline = (props: IProps) => {
  const { visible, onToggle } = props;

  const renderCloseIcon = (): React.ReactNode => {
    return (
      <img
        src='/static/icons/iconClose.svg'
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='h-[21px] w-[21px]'
      />
    );
  };

  const handleClose = () => {
    onToggle();
  };

  return (
    <>
      <Modal
        visible={visible}
        onClose={handleClose}
        closeIcon={renderCloseIcon()}
        className={styles.customDialog}
      >
        <div className='flex'>
          <img
            src='/static/images/hotline.png'
            alt=''
            className='h-[200px] w-[200px] rounded-l-[12px]'
          />
          <div className='ml-11 mr-16 flex flex-col justify-center font-[600] '>
            <div className='text-[32px]'>Contact support</div>
            <div className='mt-5 flex items-center text-[20px]'>
              <img src='/static/icons/hotline.svg' alt='' className='mr-3 h-[30px] w-[30px]' />
              024 62823535
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default PopupHotline;
