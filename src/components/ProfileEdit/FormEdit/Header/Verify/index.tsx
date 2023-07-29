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
    <div className='mb-[20px]'>
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
