import { useRef } from 'react';

import { useRouter } from 'next/router';

import ModalCompose from '@components/Home/ModalCompose';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { ROUTE_PATH } from '@utils/common';

const UserPosting = ({ addPostSuccess }: any) => {
  const router = useRouter();
  const { userLoginInfo } = useUserLoginInfo();
  const refModal: any = useRef();

  const onShowModal = () => {
    refModal?.current?.onVisible && refModal?.current?.onVisible();
  };

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

          <Text type='body-16-semibold'>{userLoginInfo?.displayName}</Text>
        </div>
        <div className='mt-[5px] pl-[61px]'>
          <textarea
            onClick={onShowModal}
            placeholder='What is in your mind?'
            className='w-full rounded-[5px] bg-[#EFF2F5] pl-[10px] pt-[10px] focus:outline-none desktop:h-[70px]'
          />
        </div>
      </div>

      <ModalCompose ref={refModal} refresh={addPostSuccess} />
    </>
  );
};

export default UserPosting;
