import { useRef } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import ModalComposeMobile from '@components/Compose/ModalComposeMobile';
import ModalCompose from '@components/Home/ModalCompose';
import UserPostingFake from '@components/Home/UserPosting/UserPostingFake';
import BaseModal, { IBaseModal } from '@components/MyProfile/MyStory/BaseModal';
import Notification from '@components/UI/Notification';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';
import { USERTYPE } from '@utils/constant';

import ComposeButton from '../ComposeButton';

const Unverify = dynamic(() => import('./UnVerify'));
const UserPosting = ({ onAddNewPost }: any) => {
  const { t } = useTranslation(['home']);

  const router = useRouter();
  const { userLoginInfo } = useUserLoginInfo();
  const refModal: any = useRef();
  const refModalUnVerify = useRef<IBaseModal>(null);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isLogin, statusUser } = useUserType();
  // const onShowModal = () => {
  //   if (userLoginInfo.custStat === 'NEW') {
  //     refModalUnVerify?.current?.open && refModalUnVerify?.current?.open();
  //   } else {
  //     refModal?.current?.onVisible && refModal?.current?.onVisible();
  //   }
  // };
  const onShowModal = async () => {
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

  if (!isLogin) {
    return <></>;
  }

  if (!userLoginInfo?.id) {
    return <UserPostingFake />;
  }

  return (
    <>
      <div className='box-shadow card-style rounded-[12px] bg-[#fff] mobile:hidden tablet:mb-[20px] tablet:block'>
        <div className='flex items-center'>
          {userLoginInfo?.avatar && (
            <img
              src={userLoginInfo?.avatar}
              alt=''
              width={0}
              height={0}
              onClick={() => {
                router.push(ROUTE_PATH.MY_PROFILE);
              }}
              sizes='100vw'
              className='mr-[10px] h-[56px] w-[56px] cursor-pointer rounded-full object-cover'
            />
          )}
          <input
            type='text'
            onClick={onShowModal}
            readOnly
            className='h-[36px] w-full flex-1 rounded-[5px] bg-[#fff] p-[10px] focus:outline-none'
            placeholder={t('what_is_on_your_mind')}
          />
        </div>
      </div>

      <ModalCompose ref={refModal} refresh={onAddNewPost} />
      <ModalComposeMobile refresh={onAddNewPost}>
        <ComposeButton />
      </ModalComposeMobile>
      <BaseModal ref={refModalUnVerify}>
        <Unverify close={refModalUnVerify?.current?.close} />
      </BaseModal>
    </>
  );
};

export default UserPosting;
