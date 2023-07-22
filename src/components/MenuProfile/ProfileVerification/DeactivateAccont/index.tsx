/* eslint-disable import/named */
import React, { useEffect } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import { MainButton } from '@components/UI/Button';
import PopupConfirmDeactivateAccount from '@components/UI/Popup/PopupConfirmDeactiveAccount';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';

interface IProps {
  isPopup?: boolean;
}

const DeactivateAccount = (props: IProps) => {
  const router = useRouter();
  const { userLoginInfo } = useUserLoginInfo();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { isDesktop } = useResponsive();

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

  useEffect(() => {
    if (isDesktop) {
      router.push(ROUTE_PATH.HOME);
    }
  }, []);

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

      <div className='px-4'>
        <Text
          type='body-24-bold'
          className={classNames('mb-6 mt-6 ', {
            'mt-0 text-center': props.isPopup,
          })}
        >
          Deactivate account
        </Text>
        <Text type='body-16-regular' className='mobile:mt-6 laptop:mt-0'>
          When closing the trading account, the login and trading on the VSD account will be
          disabled. To fulfill the request to close the trading account, all payments/settlements,
          debts, custody... must be paid accoring to the obligations of related parties. When
          requesting to close the trading account, Pinetree’s customer service department will
          receive the request and contact you directly to assist you in confirming the documents
          with your rights and obligations in the order prescribed by law.
        </Text>

        <MainButton
          onClick={deactivateAccout}
          className={classNames('mt-6 w-full', {
            'fixed bottom-9 mt-0 !w-[calc(100%-32px)]': !props.isPopup,
          })}
        >
          Got it
        </MainButton>
      </div>
    </>
  );
};

export default DeactivateAccount;
