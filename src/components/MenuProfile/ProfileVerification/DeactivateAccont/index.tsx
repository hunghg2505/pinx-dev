/* eslint-disable import/named */
import React from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { MainButton } from '@components/UI/Button';
import PopupConfirmDeactivateAccount from '@components/UI/Popup/PopupConfirmDeactiveAccount';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';

interface IProps {
  isPopup?: boolean;
}

const DeactivateAccount = (props: IProps) => {
  const { t } = useTranslation('setting');
  const router = useRouter();
  const { userLoginInfo } = useUserLoginInfo();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const deactivateAccout = () => {
    setPopupStatus({
      ...popupStatus,
      popupConfirmDeactivateAccount: true,
      popupDeactivateAccount: false,
    });
  };

  const onClosePopup = () => {
    setPopupStatus(initialPopupStatus);
  };

  if (!userLoginInfo.id) {
    return <></>;
  }
  return (
    <>
      {popupStatus.popupConfirmDeactivateAccount && (
        <PopupConfirmDeactivateAccount
          visible={popupStatus.popupConfirmDeactivateAccount}
          onClose={onClosePopup}
        />
      )}

      <div
        onClick={() => router.back()}
        className='cursor-pointer pl-[12px] pt-[12px] mobile:inline-block tablet:hidden'
      >
        <img
          src='/static/icons/back_icon.svg'
          alt='Back icon'
          className='inline-block h-[28px] w-[28px] object-contain'
        />
      </div>

      <div className='px-4'>
        <Text
          type='body-24-bold'
          className={classNames('mb-6 mt-6 ', {
            'mt-0 text-center': props.isPopup,
          })}
        >
          {t('deactivate_account')}
        </Text>
        <Text type='body-16-regular' className='mobile:mt-6 laptop:mt-0'>
          {t('deactivate_account_content')}
        </Text>

        <MainButton
          onClick={deactivateAccout}
          className={classNames('mt-6 w-full', {
            'fixed bottom-9 left-[16px] mt-0 !w-[calc(100%-32px)]': !props.isPopup,
          })}
        >
          {t('got_it')}
        </MainButton>
      </div>
    </>
  );
};

export default DeactivateAccount;
