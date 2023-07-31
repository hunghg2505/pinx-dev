import React from 'react';

import { useTranslation } from 'next-i18next';

import { ISubsidiaries } from '@components/Stock/type';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IPopupAlsoOwnProps {
  visible: boolean;
  onClose: () => void;
  data?: ISubsidiaries;
}

const PopupAlsoOwn = ({ visible, onClose, data }: IPopupAlsoOwnProps) => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <Modal visible={visible} onClose={onClose} className={styles.popup}>
      <div className='border-b border-solid border-[#EBEBEB] pb-[12px] pl-[20px]'>
        <Text type='body-20-semibold' className='text-[#0D0D0D]'>
          {t('also_own')}
        </Text>
      </div>

      <div className='mt-[24px] px-[20px]'>
        <div className='mb-[12px] flex items-center'>
          <Text type='body-16-semibold'>{data?.stockCode}</Text>
          {/* <div className='ml-[8px] flex h-[20px] items-center justify-center rounded-[4px] bg-[#F7F6F8] px-[8px]'>
            <Text type='body-10-regular' color='primary-5'>
              HOSE
            </Text>
          </div> */}

          <div className='inline-flex h-[20px] items-center justify-center rounded-[4px] border border-solid border-[#EBEBEB] px-[8px]'>
            <Text type='body-10-regular' color='primary-5' className='uppercase'>
              {t('unlisted')}
            </Text>
          </div>
        </div>

        <div className='flex items-center'>
          <div className='flex-1'>
            <img
              src='/static/images/defaultCompanyLogo.png'
              alt='Company logo'
              className='h-[52px] w-[52px] object-contain'
            />

            <Text className='mt-[4px] !leading-[16px] text-[#999999]' type='body-12-regular'>
              {data?.name}
            </Text>
          </div>

          <div className='ml-[8px] text-right'>
            <Text type='body-12-regular' className='mb-[4px] text-[#999999]'>
              {t('own')}
            </Text>
            <Text type='body-16-semibold' className='text-[#0D0D0D]'>
              {data?.ownerRatio}%
            </Text>
          </div>
        </div>

        <Text type='body-14-regular' color='primary-5' className='mt-[16px]'>
          {data?.mainBusiness}
        </Text>
      </div>
    </Modal>
  );
};

export default PopupAlsoOwn;
