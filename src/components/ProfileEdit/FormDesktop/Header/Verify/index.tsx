import React, { useContext } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/ProfileEdit';
import { calcUserStatusText } from '@utils/common';
import { USER_STATUS_PENDING, USER_STATUS_VERIFIED } from '@utils/constant';

const Verify = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { t } = useTranslation('common');
  return (
    <div
      className={classNames(
        'absolute left-[calc(16px+113px/2)] -translate-x-1/2 text-[14px] tablet:left-[calc(10px+100px/2)] xdesktop:left-[calc(32px+120px/2)]',
        {
          'top-[calc(100%+115px)] tablet:top-[calc(100%+110px)] xdesktop:top-[calc(100%+135px)]':
            !profileUser?.name,
          'top-[calc(100%+125px)] tablet:top-[calc(100%+120px)] xdesktop:top-[calc(100%+145px)]':
            !!profileUser?.name,
        },
      )}
    >
      <span
        className={classNames(
          'text[12px] line-[16px] font[500] mx-auto flex items-center justify-center gap-[4px] text-[#EAA100]',
          {
            '!text-[#128F63]':
              calcUserStatusText(profileUser?.acntStat || '') === USER_STATUS_VERIFIED,
            '!text-[#F1BA09]':
              calcUserStatusText(profileUser?.acntStat || '') === USER_STATUS_PENDING,
          },
        )}
      >
        {t(calcUserStatusText(profileUser?.acntStat))}
      </span>
    </div>
  );
};
export default Verify;
