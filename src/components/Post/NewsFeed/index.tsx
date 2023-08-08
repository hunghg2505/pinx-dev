import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';

import CommentField from './CommentField';
import ItemComment from './ItemComment';
import NewFeedItem from './NewFeedItem';
import { IPost, useCommentsOfPost, usePostDetail } from '../service';

interface IProps {
  data: IPost;
  pinned?: boolean;
  onRefreshList?: () => void;
  onRemoveData?: () => void;
  isNewFeedExplore?: boolean;
}
const NewsFeed = (props: IProps) => {
  const { t } = useTranslation('home');
  const { data, pinned = false, onRefreshList, onRemoveData, isNewFeedExplore = false } = props;
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const isLogin = !!getAccessToken();
  const [postData, setPostData] = useState(data);
  React.useEffect(() => {
    setPostData(data);
  }, [data]);
  React.useEffect(() => {
    const findIndex = postDetailStatus?.isAddCommentPostDetail?.findIndex(
      (item: string) => item === postData?.id,
    );
    if (findIndex !== -1) {
      refresh();
    }
  }, []);
  const { refresh } = usePostDetail(data?.id, {
    onSuccess: (res: any) => {
      setPostData(res?.data);
      setPostDetailStatus({
        ...postDetailStatus,
        isAddCommentPostDetail: [],
      });
    },
  });
  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${postData?.id}`);
  };

  const [, setImageCommentMobile] = useState(false);

  const { commentsOfPost, refreshCommentOfPost } = useCommentsOfPost(String(postData?.id));
  // const totalComments = commentsOfPost?.data?.list?.length;
  // const commentChild = commentsOfPost?.data?.list?.reduce(
  //   (acc: any, current: any) => acc + current?.totalChildren,
  //   0,
  // );

  const countComment = postData?.totalChildren;

  const ViewMore = () => {
    if (countComment > 1) {
      return (
        <CustomLink href={`/post/${postData?.id}`}>
          <div className='mb-[5px] mt-[15px] flex h-[36px] cursor-pointer flex-row items-center justify-center rounded-[4px] bg-[#EAF4FB]'>
            <Text type='body-14-medium' color='primary-2'>
              {t('common:view_more')} {countComment - 1} {t('common:comments')}...
            </Text>
          </div>
        </CustomLink>
      );
    }

    return <></>;
  };

  const onRefreshPostItem = (newData: IPost, isEdit = false) => {
    setPostData(newData);
    refresh();
    if (onRefreshList) {
      onRefreshList();
    }

    if (!isEdit && onRemoveData) {
      onRemoveData();
    }
  };

  if (!postData) {
    return <></>;
  }
  const refreshComment = () => {
    // if (onRefreshList) {
    //   onRefreshList();
    // }
    refresh();
    refreshCommentOfPost();
  };

  return (
    <>
      <div className='box-shadow mb-5 rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white p-[12px] desktop:p-[16px]'>
        <NewFeedItem
          onNavigate={onNavigate}
          postDetail={postData}
          totalComments={postData?.totalChildren}
          onRefreshPostDetail={onRefreshPostItem}
          pinned={pinned}
          isNewFeedExplore={isNewFeedExplore}
        />

        {isLogin && !isNewFeedExplore && (
          <div className='mt-4 tablet:block desktop:ml-[64px] '>
            <CommentField
              id={postData?.id}
              refresh={refreshComment}
              refreshTotal={() => {}}
              setImageCommentMobile={setImageCommentMobile}
            />
          </div>
        )}

        {!!countComment && !isNewFeedExplore && (
          <div className=' desktop:ml-[64px]'>
            {countComment > 0 && (
              <div className='mt-[22px]'>
                <ItemComment
                  onNavigate={onNavigate}
                  data={commentsOfPost?.data?.list?.[0]}
                  refreshCommentOfPOst={refreshComment}
                />
              </div>
            )}

            <ViewMore />
          </div>
        )}
      </div>
    </>
  );
};
export default NewsFeed;
