import React from 'react';

import classNames from 'classnames';
import Dialog from 'rc-dialog';

import ItemComment from '@components/Post/NewsFeed/ItemComment';
import { ForwardedRefComponent } from '@components/Post/PostDetail';
import { IComment } from '@components/Post/service';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';

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
  const isLogin = !!getAccessToken();

  const refSubReplies: any = React.useRef();
  const [visible, setVisible] = React.useState<boolean>(false);
  // const [showReply, setShowReply]: any = React.useState('');
  const [isImageCommentMobile, setImageCommentMobile] = React.useState(false);
  const isHaveComment = commentsOfPost?.data?.list?.length > 0;
  const onVisible = () => {
    setVisible(!visible);
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
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()}>
        <div className=''>
          <Text type='body-20-semibold' color='primary-5' className='text-center'>
            Comment
          </Text>
          <div
            className={classNames('mt-[16px] h-[500px] overflow-y-scroll', {
              'mobile:mb-[79px]': !isImageCommentMobile,
              'mobile:mb-[179px]': isImageCommentMobile,
            })}
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
                There is no comments
              </Text>
            )}
          </div>
          {isLogin && (
            <div className='mobile:block'>
              <div className='fixed bottom-0 z-10 w-[375px] border-t border-solid border-t-[var(--primary-3)] bg-white pt-[16px]'>
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
