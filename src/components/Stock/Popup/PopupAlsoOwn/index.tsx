import React from 'react';

import Dialog from 'rc-dialog';

import 'rc-dialog/assets/index.css';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IPopupAlsoOwnProps {
  visible: boolean;
  onClose: () => void;
}

const PopupAlsoOwn = ({ visible, onClose }: IPopupAlsoOwnProps) => {
  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      closeIcon={
        <img
          src='/static/icons/iconClose.svg'
          alt='Close icon'
          className='h-[21px] w-[21px] object-contain'
        />
      }
      className={styles.popup}
    >
      <div className='border-b border-solid border-[#EBEBEB] pb-[12px] pl-[20px]'>
        <Text type='body-20-semibold' className='text-[#0D0D0D]'>
          Also Own
        </Text>
      </div>

      <div className='mt-[24px] px-[20px]'>
        <div className='mb-[12px] flex items-center'>
          <Text type='body-16-semibold'>MBS</Text>
          <div className='ml-[8px] flex h-[20px] items-center justify-center rounded-[4px] bg-[#F7F6F8] px-[8px]'>
            <Text type='body-10-regular' color='primary-5'>
              HOSE
            </Text>
          </div>
        </div>

        <div className='flex items-center'>
          <div>
            <img
              src='/static/images/defaultCompanyLogo.png'
              alt='Company logo'
              className='h-[52px] w-[52px] object-contain'
            />

            <Text className='mt-[4px] !leading-[16px] text-[#999999]' type='body-12-regular'>
              Phuc An Tourism Development and Investment Co., Ltd
            </Text>
          </div>

          <div className='ml-[8px] text-right'>
            <Text type='body-12-regular' className='mb-[4px] text-[#999999]'>
              Own
            </Text>
            <Text type='body-16-semibold' className='text-[#0D0D0D]'>
              100%
            </Text>
          </div>
        </div>

        <Text type='body-14-regular' color='primary-5' className='mt-[16px]'>
          Quản lý nợ và khai thác tài sản
        </Text>
      </div>
    </Dialog>
  );
};

export default PopupAlsoOwn;
