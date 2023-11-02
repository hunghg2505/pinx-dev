import React from 'react';

import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import ModalCompose from '@components/Home/ModalCompose';
import Notification from '@components/UI/Notification';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { USERTYPE } from 'src/constant';

interface IProps {
  children: any;
  refresh?: () => void;
}

const ModalComposeMobile = (props: IProps) => {
  const { t } = useTranslation('common');
  const { children, refresh } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isLogin, statusUser } = useUserType();
  const refModal: any = React.useRef<any>(null);

  const onVisible = async () => {
    if (isLogin) {
      if (statusUser === USERTYPE.VSD) {
        refModal?.current?.onVisible();
      } else if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
      } else {
        setPopupStatus({
          ...popupStatus,
          popupEkyc: true,
        });
      }
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

      <ModalCompose ref={refModal} refresh={refresh} />
    </>
  );
};
export default ModalComposeMobile;
