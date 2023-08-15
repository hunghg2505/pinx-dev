import React, { useState } from 'react';

import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useAuth } from '@store/auth/useAuth';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { postThemeAtom } from '@store/postTheme/theme';
import { ClickaPost } from '@utils/dataLayer';

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

  const { isLogin } = useAuth();

  const [postData, setPostData] = useState(data);
  React.useEffect(() => {
    setPostData(data);
  }, [data]);
  const findItemFollow = postDetailStatus?.idCustomerFollow === postData?.customerId;
  const itemLike = postDetailStatus?.idPostLike === postData?.id;
  const findIndex = postDetailStatus?.isAddCommentPostDetail?.findIndex(
    (item: string) => item === postData?.id,
  );
  const bgTheme = useAtomValue(postThemeAtom);

  const { hashtags, Ticker, Link, themeName, postType } = React.useMemo(() => {
    const hashtags = postData?.post?.hashtags || [];
    const Ticker = postData?.post?.tagStocks;
    const Link = postData?.post?.urlLinks;
    const themeActive = bgTheme?.find((item) => item.id === postData?.post?.postThemeId);
    const themeName = themeActive?.name || '';
    const postType = postData?.post?.postType;

    // const theme;
    return {
      hashtags,
      Ticker,
      Link,
      themeName,
      postType,
    };
  }, [postData]);

  React.useEffect(() => {
    if (findIndex !== -1 || findItemFollow || itemLike) {
      refresh();
    }
  }, [findItemFollow, postDetailStatus?.idPostLike]);

  React.useEffect(() => {
    if (findIndex === -1 && !findItemFollow && !itemLike) {
      setPostData(data);
    }
  }, [data]);

  const { refresh } = usePostDetail(data?.id, {
    onSuccess: (res: any) => {
      setPostData(res?.data);
      setPostDetailStatus({
        ...postDetailStatus,
        isAddCommentPostDetail: [],
        idCustomerFollow: 0,
      });
    },
  });

  const router = useRouter();

  const onNavigate = () => {
    ClickaPost(postData?.id, postType, hashtags, Ticker, Link, themeName);
    router.push(`/post/${postData?.id}`);
  };

  const [, setImageCommentMobile] = useState(false);

  const { commentsOfPost, refreshCommentOfPost } = useCommentsOfPost(String(postData?.id));

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
          refreshFollow={refresh}
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
