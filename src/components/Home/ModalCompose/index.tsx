import React from 'react';

import { useDebounceFn } from 'ahooks';
import { useTranslation } from 'next-i18next';

import Compose from '@components/Compose';
import { IPost } from '@components/Post/service';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface Iprops {
  closeIcon?: boolean;
  refresh?: (data: IPost) => void;
}
const ModalCompose = (props: Iprops, ref: any) => {
  const { t } = useTranslation('common');
  const { refresh } = props;
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState<any>();
  const [visibleConfirm, setVisibleConfirm] = React.useState(false);

  const { run } = useDebounceFn(
    (value) => {
      setValue(value);
    },
    {
      wait: 500,
    },
  );
  const onVisible = () => {
    setValue(undefined);
    setVisible(!visible);
  };
  const onCloseModal = () => {
    if (value) {
      setVisibleConfirm(true);
    } else {
      setVisible(false);
    }
  };
  const onGetData = (value: any) => {
    run(value);
  };
  const onOk = () => {
    setVisible(false);
    setVisibleConfirm(false);
  };
  const onCancel = () => {
    setVisibleConfirm(false);
  };
  const hidePopup = () => {
    setVisibleConfirm(false);
    setVisible(false);
    setValue('');
  };
  React.useImperativeHandle(ref, () => ({ onVisible }));

  return (
    <>
      <Modal
        visible={visible}
        onClose={onCloseModal}
        className={styles.modalCompose}
        destroyOnClose={true}
      >
        <div className='text-center'>
          <Text type='body-20-semibold' color='neutral-black'>
            {t('create_post')}
          </Text>
          <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div>
            <Compose hidePopup={hidePopup} refresh={refresh} onGetData={onGetData} />
          </div>
        </div>
      </Modal>

      <Modal
        visible={visibleConfirm}
        className={styles.modalCompose}
        onClose={() => setVisibleConfirm(false)}
        destroyOnClose
      >
        <div className=''>
          <Text type='body-20-semibold' color='neutral-black'>
            {t('quit')}
          </Text>
          <Text type='body-14-regular' color='cbblack'>
            {t('quit.desc')}
          </Text>
          <div className='mt-[32px] flex items-center justify-between gap-x-[12px]'>
            <div
              className='flex h-[52px] w-[180px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[8px] border border-solid border-[var(--primary-6)] bg-primary_blue_light'
              onClick={onCancel}
            >
              <Text type='body-16-bold' className='text-primary_blue'>
                {t('cancel')}
              </Text>
            </div>
            <div
              className='flex h-[52px] w-[180px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[#1F6EAC]'
              onClick={onOk}
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
export default React.forwardRef(ModalCompose);
