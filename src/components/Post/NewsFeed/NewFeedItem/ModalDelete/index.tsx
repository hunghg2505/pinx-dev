import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { useDeletePost } from '@components/Post/service';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IProps {
  children: any;
  id: string;
  onDeletePost: () => void;
}

const ModalDelete = (props: IProps) => {
  const { t } = useTranslation();
  const { children, id, onDeletePost } = props;
  const [visible, setVisible] = useState(false);

  const { run } = useDeletePost({
    onSuccess: () => {
      toast(() => <Notification type='success' message={t('delete_post_success')} />);
      setVisible(false);
      onDeletePost();
    },
  });

  const onVisible = () => {
    setVisible(!visible);
  };

  const onOk = () => {
    run(id);
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>

      <Modal visible={visible} onClose={onVisible} className={styles.modalDelete} closable={false}>
        <div className=''>
          <Text type='body-20-semibold' color='neutral-black'>
            {t('delete')}
          </Text>
          <Text type='body-14-regular' color='cbblack'>
            {t('delete.desc')}
          </Text>
          <div className='mt-[32px] flex items-center justify-between gap-[12px]'>
            <div
              className='flex h-[52px] w-[180px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[8px] border border-solid border-[var(--primary-6)] bg-primary_blue_light galaxy-max:h-[44px]'
              onClick={onVisible}
            >
              <Text type='body-16-bold' className='text-primary_blue galaxy-max:text-[14px]'>
                {t('cancel')}
              </Text>
            </div>

            <div
              className='flex h-[52px] w-[180px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[#1F6EAC] galaxy-max:h-[44px]'
              onClick={onOk}
            >
              <Text type='body-16-bold' className='galaxy-max:text-[14px]' color='cbwhite'>
                {t('ok')}
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalDelete;
