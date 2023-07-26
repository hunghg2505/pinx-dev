import React from 'react';

import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';

import styles from './index.module.scss';
import Compose from '..';

interface IProps {
  children: any;
  refresh?: () => void;
}

const ModalComposeMobile = (props: IProps) => {
  const { t } = useTranslation(['home', 'common']);
  const { children, refresh } = props;
  const [visible, setVisible] = React.useState<boolean>(false);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isLogin } = useUserType();
  const onVisible = async () => {
    if (isLogin) {
      setVisible(!visible);
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>
      <Modal visible={visible} onClose={onVisible} className={styles.modalCompose} destroyOnClose>
        <div className='h-[100%] text-center'>
          <Text type='body-20-semibold' color='neutral-black'>
            {t('common:create_post')}
          </Text>
          <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div className='mobile-max:h-[70%]'>
            <Compose hidePopup={onVisible} refresh={refresh} />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalComposeMobile;
