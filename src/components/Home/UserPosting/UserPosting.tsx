import { useRef } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ModalCompose from '@components/Home/ModalCompose';
import BaseModal, { IBaseModal } from '@components/MyProfile/MyStory/BaseModal';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

const Unverify = dynamic(() => import('./UnVerify'));
const UserPosting = ({ onAddNewPost }: any) => {
  const { t } = useTranslation('home');

  const router = useRouter();
  const { userLoginInfo } = useUserLoginInfo();
  const refModal: any = useRef();
  const refModalUnVerify = useRef<IBaseModal>(null);
  const { isLogin } = useAuth();

  const onShowModal = () => {
    if (userLoginInfo.custStat === 'NEW') {
      refModalUnVerify?.current?.open && refModalUnVerify?.current?.open();
    } else {
      refModal?.current?.onVisible && refModal?.current?.onVisible();
    }
  };

  if (!isLogin) {
    return <></>;
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

          <Text type='body-16-semibold' className='truncate max-w-[calc(100%-100px)] w-full flex-1'>{userLoginInfo?.displayName}</Text>
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
