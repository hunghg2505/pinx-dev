import React, { useContext } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Post = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);
  const { push, query } = useRouter();
  return (
    <p
      className='hidden   cursor-pointer text-[12px] tablet:flex tablet:flex-col-reverse'
      onClick={() => {
        push({ query: { ...query, tab: 'post' } });
      }}
    >
      <b className='mr-[8px] font-[600] leading-[18px]'>{profileUser?.totalPost || 0}</b>
      <span className='leading-[16px] text-dark_grey tablet:leading-[18px]'>
        {t('post')}
        <span className='hidden tablet:inline'>:</span>
      </span>
    </p>
  );
};
export default Post;
