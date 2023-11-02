import { useRef } from 'react';

import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

import UserPostingFake from '@components/Home/UserPosting/UserPostingFake';
import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import BaseModal, { IBaseModal } from '@components/MyProfile/MyStory/BaseModal';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { useLogin } from '@store/auth/hydrateAuth';

const Unverify = dynamic(() => import('./UnVerify'));
const UserInformationDesktop = lazyLoadHydrate(() => import('./UserInformationDesktop'), false);
const UserPostMobile = dynamic(() => import('./UserPostMobile'), {
  ssr: false,
});

const UserPosting = ({ onAddNewPost }: any) => {
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const refModalUnVerify = useRef<IBaseModal>(null);

  const { isLogin } = useLogin();

  if (!isLogin) {
    return <></>;
  }

  if (!userLoginInfo?.id) {
    return <UserPostingFake />;
  }

  return (
    <>
      <div className='box-shadow card-style rounded-[12px] bg-[#fff] mobile:hidden tablet:mb-[20px] tablet:block'>
        <UserInformationDesktop onAddNewPost={onAddNewPost} />
      </div>
      <UserPostMobile onAddNewPost={onAddNewPost} />

      <BaseModal ref={refModalUnVerify}>
        <Unverify close={refModalUnVerify?.current?.close} />
      </BaseModal>
    </>
  );
};

export default UserPosting;
