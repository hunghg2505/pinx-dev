import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { useDeletePost } from '@components/Post/service';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';

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

      <Modal visible={visible} onClose={onVisible} closable={false}>
        <div className=''>
          <Text type='body-20-semibold' color='neutral-black'>
            {t('delete')}
          </Text>
          <Text type='body-14-regular' color='cbblack'>
            {t('delete.desc')}
          </Text>
          <div className='mt-[32px] flex items-center justify-between gap-[12px]'>
            <div
              className='flex h-[52px] w-[180px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[linear-gradient(0deg,_#B1D5F1,_#B1D5F1),linear-gradient(0deg,_#EFF2F5,_#EFF2F5)]'
              onClick={onVisible}
            >
              <Text type='body-16-bold' color='primary-2'>
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
export default ModalDelete;
