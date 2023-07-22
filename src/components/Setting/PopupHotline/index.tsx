import React from 'react';

import Dialog from 'rc-dialog';

import 'rc-dialog/assets/index.css';
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
        className='w-[21px] h-[21px]'
      />
    );
  };

  const handleClose = () => {
    onToggle();
  };


  return (
    <>
      <Dialog visible={visible} onClose={handleClose} closeIcon={renderCloseIcon()} className={styles.customDialog}>
        <div className='flex'>
          <img
            src='/static/images/hotline.png'
            alt=''
            className='h-[200px] w-[200px] rounded-l-[12px]'
          />
          <div className='flex flex-col justify-center ml-11 font-[600] mr-16 '>
            <div className='text-[32px]'>
              Contact support
            </div>
            <div className='flex items-center text-[20px] mt-5'>
              <img
                src='/static/icons/hotline.svg'
                alt=''
                className='h-[30px] w-[30px] mr-3'
              />
              024 62823535
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default PopupHotline;
