import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Dialog from 'rc-dialog';

import ItemComment from '@components/Post/NewsFeed/ItemComment';
import { ForwardedRefComponent } from '@components/Post/PostDetail';
import { IComment } from '@components/Post/service';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';

import styles from './index.module.scss';

interface Iprops {
  children: any;
  closeIcon?: boolean;
  commentsOfPost: any;
  refreshCommentOfPost: () => void;
  id: string;
  refresh: () => void;
}

const ModalComment = (props: Iprops) => {
  const { children, closeIcon, commentsOfPost, refreshCommentOfPost, id, refresh } = props;
  const { t } = useTranslation('common');
  const isLogin = !!getAccessToken();

  const refSubReplies: any = React.useRef();
  const [visible, setVisible] = React.useState<boolean>(false);
  // const [showReply, setShowReply]: any = React.useState('');
  const [isImageCommentMobile, setImageCommentMobile] = React.useState(false);
  const isHaveComment = commentsOfPost?.data?.list?.length > 0;
  const onVisible = () => {
    setVisible(!visible);
    if (refSubReplies?.current?.clearData) {
      refSubReplies?.current?.clearData();
    }
  };
  const onReplies = async (value: string, customerId: number, id: string) => {
    // setShowReply(id);
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    if (refSubReplies?.current?.onComment) {
      refSubReplies?.current?.onComment(value, customerId, id);
    }
  };
  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return (
      <img
        src='/static/icons/iconClose.svg'
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='w-[21px]'
      />
    );
  };
  const getSubComment = (payload: IComment[]) => {
    if (payload.length > 0) {
      return (
        <div className='sub-comment ml-[48px]'>
          {payload?.map((comment: IComment, index: number) => (
            <ItemComment
              data={comment}
              key={index}
              onReplies={onReplies}
              refresh={refreshCommentOfPost}
              refreshTotal={refresh}
              isChildren={true}
            />
          ))}
        </div>
      );
    }
  };
  return (
    <>
      <div onClick={onVisible} className='cursor-pointer'>
        {children}
      </div>
      <Dialog
        visible={visible}
        onClose={onVisible}
        closeIcon={renderCloseIcon()}
        className={styles.modalComment}
      >
        <div className='h-[80vh]'>
          <Text type='body-20-semibold' color='primary-5' className='text-center'>
            {t('comment')}
          </Text>
          <div className='mb-[20px] mt-[10px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div
            className={classNames(
              'mt-[16px] h-[66vh] overflow-y-auto',
              {
                'mobile:mb-[79px]': !isImageCommentMobile && isLogin,
                'mobile:mb-[179px]': isImageCommentMobile && isLogin,
              },
              styles.content,
            )}
          >
            {isHaveComment ? (
              commentsOfPost?.data?.list?.map((item: IComment, index: number) => {
                return (
                  <>
                    <ItemComment
                      key={index}
                      data={item}
                      onReplies={onReplies}
                      refreshTotal={refresh}
                      refresh={refreshCommentOfPost}
                    />
                    {getSubComment(item.children)}
                  </>
                );
              })
            ) : (
              <Text
                type='body-14-regular'
                color='neutral-3'
                className='mt-[16px] text-center tablet:hidden'
              >
                {t('empty_comment')}
              </Text>
            )}
          </div>
          {isLogin && (
            <div className='mobile:block'>
              <div className='fixed bottom-0 z-10 w-[375px] break-all border-t border-solid border-t-[var(--primary-3)] bg-white pt-[16px] mobile-max:left-2/4 mobile-max:min-h-[34px] mobile-max:w-[calc(100%_-_32px)] mobile-max:-translate-x-1/2 mobile-max:transform mobile-max:px-[3px]'>
                <ForwardedRefComponent
                  ref={refSubReplies}
                  id={id}
                  refresh={refreshCommentOfPost}
                  refreshTotal={refresh}
                  setImageCommentMobile={setImageCommentMobile}
                  // width={width}
                />
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};
export default ModalComment;
