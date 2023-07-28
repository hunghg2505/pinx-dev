import React from 'react';

import { useTranslation } from 'next-i18next';

import Modal from '@components/UI/Modal/Modal';

import styles from './index.module.scss';

interface IProps {
  visible: boolean;
  onToggle: () => void;
}

const PopupHotline = (props: IProps) => {
  const { t } = useTranslation();
  const { visible, onToggle } = props;

  const handleClose = () => {
    onToggle();
  };

  return (
    <>
      <Modal visible={visible} onClose={handleClose} className={styles.customDialog}>
        <div className='flex'>
          <img
            src='/static/images/hotline.png'
            alt=''
            className='h-[200px] w-[200px] rounded-l-[12px]'
          />
          <div className='ml-11 mr-16 flex flex-col justify-center font-[600] '>
            <div className='text-[32px]'>{t('contact_support')}</div>
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
