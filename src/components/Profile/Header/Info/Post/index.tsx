import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Post = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);
  return (
    <p className='hidden   text-[12px] tablet:flex tablet:flex-col-reverse '>
      <b className='mr-[8px] font-[600] leading-[18px]'>{profileUser?.totalPost || 0}</b>
      <span className='text-dark_grey leading-[16px] tablet:leading-[18px]'>
        {t('post')}
        <span className='hidden tablet:inline'>:</span>
      </span>
    </p>
  );
};
export default Post;
