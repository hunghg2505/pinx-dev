import { useRef } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import ModalCompose from '@components/Home/ModalCompose';
import UserPostingFake from '@components/Home/UserPosting/UserPostingFake';
import BaseModal, { IBaseModal } from '@components/MyProfile/MyStory/BaseModal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';
import { USERTYPE } from '@utils/constant';

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
      <div className='rounded-[8px] bg-[#FFFFFF] p-[20px] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)] mobile:hidden tablet:mb-[20px] tablet:block'>
        <div
          className='flex items-center'
          onClick={() => {
            router.push(ROUTE_PATH.MY_PROFILE);
          }}
        >
          {userLoginInfo?.avatar && (
            <img
              src={userLoginInfo?.avatar}
              alt=''
              width={0}
              height={0}
              sizes='100vw'
              className='mr-[10px] h-[56px] w-[56px] cursor-pointer rounded-full object-cover'
            />
          )}

          <div className='flex items-center'>
            <Text type='body-16-semibold' className='w-full max-w-[160px] truncate'>
              {userLoginInfo?.displayName}
            </Text>

            {userLoginInfo?.isKol && (
              <img
                src='/static/icons/iconTick.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='ml-[8px] h-[16px] w-[16px] object-contain'
              />
            )}

            {userLoginInfo?.isFeatureProfile && (
              <img
                src='/static/icons/iconKol.svg'
                alt=''
                width={0}
                height={0}
                sizes='100vw'
                className='ml-[2px] h-[20px] w-[20px] object-contain'
              />
            )}
          </div>
        </div>
        <div className='mt-[5px] pl-[61px]'>
          <textarea
            onClick={onShowModal}
            placeholder={t('what_is_in_your_mind')}
            className='w-full rounded-[5px] bg-[#EFF2F5] pl-[10px] pt-[10px] focus:outline-none desktop:h-[70px]'
          />
        </div>
      </div>

      <ModalCompose ref={refModal} refresh={onAddNewPost} />
      <BaseModal ref={refModalUnVerify}>
        <Unverify close={refModalUnVerify?.current?.close} />
      </BaseModal>
    </>
  );
};

export default UserPosting;
