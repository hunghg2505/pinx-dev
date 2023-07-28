import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { TYPEPOST } from '@components/Post/service';
import Fade from '@components/UI/Fade';
import IconPlus1 from '@components/UI/Icon/IconPlus1';
import Text from '@components/UI/Text';

export const Follower = ({ postDetail, onFollow, following, isMyPost }: any) => {
  const { t } = useTranslation();

  if (
    ![
      TYPEPOST.POST,
      TYPEPOST.ActivityTheme,
      TYPEPOST.ActivityMatchOrder,
      TYPEPOST.ActivityWatchlist,
    ].includes(postDetail?.post.postType)
  ) {
    return <></>;
  }

  if (following) {
    return (
      <div className='cursor-pointer' onClick={onFollow}>
        <div
          className={classNames(
            'mr-[10px] flex h-[36px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] px-[12px] mobile:hidden tablet:flex ',
            { 'bg-[#F3F2F6]': following },
          )}
        >
          <Text type='body-14-bold' color='neutral-5'>
            {t('following')}
          </Text>
        </div>

        <img
          src='/static/icons/iconUserFollow.svg'
          alt=''
          width={0}
          height={0}
          className='mr-[10px] w-[24px] mobile:block tablet:hidden'
          sizes='100vw'
        />
      </div>
    );
  }
  return (
    <>
      <Fade visible={!isMyPost}>
        <div className='cursor-pointer' onClick={onFollow}>
          <div
            className={classNames(
              'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
              { 'bg-[#F3F2F6]': following },
            )}
          >
            <IconPlus1 />
            <Text type='body-14-bold' color='primary-2' className='ml-[5px]'>
              {t('follow')}
            </Text>
          </div>

          <img
            src='/static/icons/iconUserUnFollow.svg'
            alt=''
            width={0}
            height={0}
            className='mr-[10px] w-[24px] mobile:block tablet:hidden'
            sizes='100vw'
          />
        </div>
      </Fade>
    </>
  );
};
