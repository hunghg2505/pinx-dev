import React, { useRef } from 'react';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import ModalCompose from '@components/Home/ModalCompose';
import Notification from '@components/UI/Notification';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { USERTYPE } from 'src/constant';

const NotFound = ({ refresh }: any) => {
  const { t } = useTranslation(['profile', 'common']);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { statusUser } = useUserType();
  const onClickWrite = () => {
    if (statusUser === USERTYPE.VSD) {
      refModal?.current?.onVisible && refModal?.current?.onVisible();
    } else if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
      toast(() => <Notification type='error' message={t('message_account_pending_to_close')} />);
    } else {
      setPopupStatus({
        ...popupStatus,
        popupEkyc: true,
      });
    }
  };
  const refModal: any = useRef();
  return (
    <>
      <div className='mt-[41px]  flex w-full flex-wrap justify-between gap-[24px] rounded-[12px] bg-primary_bgblue_2 p-[24px] text-center tablet:flex-nowrap tablet:px-0'>
        <div className='flex-2 flex  w-full items-center tablet:mb-[12px] '>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={'/static/images/write_now.png'}
            alt="Don't have any result"
            className='mb-[50px]  object-contain tablet:my-auto'
          />
        </div>
        <div className='align-center flex-0 mr-[12px]  flex w-full items-center justify-center rounded-[12px] bg-[#edf6fe]  py-[44px]'>
          <div className='mx-auto my-auto w-fit'>
            <p className=' line-[28px]  mb-[30px]  max-w-[225px] text-[20px] font-[600] '>
              {t('post_empty')}
            </p>
            <button
              onClick={() => onClickWrite()}
              className='line-[18px] block w-full  max-w-[260px] rounded-[8px] bg-gradient-to-l from-[#1D6CAB] to-[#589DC0] px-[24px] py-[12px] text-[14px] font-[600] text-white'
            >
              {t('write_now')}
            </button>
          </div>
        </div>
      </div>
      <ModalCompose ref={refModal} refresh={refresh} />
    </>
  );
};
export default NotFound;
