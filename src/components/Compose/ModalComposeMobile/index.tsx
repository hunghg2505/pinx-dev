import React from 'react';

import { useAtom } from 'jotai';

import ModalCompose from '@components/Home/ModalCompose';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';

interface IProps {
  children: any;
  refresh?: () => void;
}

const ModalComposeMobile = (props: IProps) => {
  const { children, refresh } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isLogin } = useUserType();
  const refModal: any = React.useRef<any>(null);

  const onVisible = async () => {
    if (isLogin) {
      refModal?.current?.onVisible();
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
