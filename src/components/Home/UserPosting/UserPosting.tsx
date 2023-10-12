import { useRef } from 'react';

import { useSize } from 'ahooks';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import ModalComposeMobile from '@components/Compose/ModalComposeMobile';
import ModalCompose from '@components/Home/ModalCompose';
import UserPostingFake from '@components/Home/UserPosting/UserPostingFake';
import BaseModal, { IBaseModal } from '@components/MyProfile/MyStory/BaseModal';
import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import CustomLink from '@components/UI/CustomLink';
import Notification from '@components/UI/Notification';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { useUserType } from '@hooks/useUserType';
import { useLogin } from '@store/auth/hydrateAuth';
import { popupStatusAtom } from '@store/popup/popup';
import { profileSettingAtom } from '@store/profileSetting/profileSetting';
import { ROUTE_PATH, isUrlValid } from '@utils/common';
import { USERTYPE } from 'src/constant';

import ComposeButton from '../ComposeButton';

const Unverify = dynamic(() => import('./UnVerify'));
const UserPosting = ({ onAddNewPost }: any) => {
  const { t } = useTranslation(['home']);

  const router = useRouter();
  const [profileSetting] = useAtom(profileSettingAtom);
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const isCanCompose = profileSetting?.ignore_vsd_validator?.includes(userLoginInfo.cif);
  const refModal: any = useRef();
  const refModalUnVerify = useRef<IBaseModal>(null);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { statusUser } = useUserType();
  const { isLogin } = useLogin();
  const size = useSize(() => document?.querySelector('body'));
  const onShowModal = async () => {
    if (isLogin) {
      if (statusUser === USERTYPE.VSD || isCanCompose) {
        refModal?.current?.onVisible();
      } else if (statusUser === USERTYPE.PENDING_TO_CLOSE && !isCanCompose) {
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
      {size && size.width > 768 && (
        <div className='box-shadow card-style rounded-[12px] bg-[#fff] mobile:hidden tablet:mb-[20px] tablet:block'>
          <div className='flex items-center'>
            {isUrlValid(userLoginInfo?.avatar) ? (
              <CustomImage
                src={userLoginInfo?.avatar || ''}
                alt=''
                onClick={() => {
                  router.push(ROUTE_PATH.PROFILE_V2(userLoginInfo?.displayName, userLoginInfo?.id));
                }}
                width='0'
                height='0'
                sizes='100vw'
                className='mr-[10px] h-[56px] w-[56px] cursor-pointer rounded-full border border-solid border-[#ebebeb] object-cover'
              />
            ) : (
              <CustomLink
                href={ROUTE_PATH.PROFILE_V2(userLoginInfo?.displayName, userLoginInfo?.id)}
                className='mr-[10px] h-[56px] w-[56px] cursor-pointer rounded-full object-cover'
              >
                <AvatarDefault name={userLoginInfo?.displayName} />
              </CustomLink>
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
      )}

      <ModalCompose ref={refModal} refresh={onAddNewPost} />

      {size && size.width < 769 && (
        <ModalComposeMobile refresh={onAddNewPost}>
          <ComposeButton />
        </ModalComposeMobile>
      )}

      <BaseModal ref={refModalUnVerify}>
        <Unverify close={refModalUnVerify?.current?.close} />
      </BaseModal>
    </>
  );
};

export default UserPosting;
