import React, { useState } from 'react';

import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { useAuth } from '@store/auth/useAuth';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { postThemeAtom } from '@store/postTheme/theme';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH } from '@utils/common';
import { ClickaPost } from '@utils/dataLayer';

import CommentField from './CommentField';
import ItemComment from './ItemComment';
import NewFeedItem from './NewFeedItem';
import NewsFeedSkeleton from './NewsFeedSkeleton';
import { IPost, usePostDetail } from '../service';

interface IProps {
  data: IPost;
  pinned?: boolean;
  onRefreshList?: () => void;
  onRemoveData?: () => void;
  isNewFeedExplore?: boolean;
  refreshSearch?: () => void;
  loading?: boolean;
  hiddenComment?: boolean;
  isSearchSeoBox?: boolean;
  onTrackingViewTicker?: (stockCode: string) => void;
  onTrackingViewTickerCmt?: (stockCode: string) => void;
  onCommentPost?: (postData: IPost) => void;
}

const NewsFeed = (props: IProps) => {
  const { t } = useTranslation('home');
  const {
    data,
    pinned = false,
    onRefreshList,
    onRemoveData,
    isNewFeedExplore = false,
    refreshSearch,
    loading,
    hiddenComment,
    isSearchSeoBox,
    onTrackingViewTicker,
    onTrackingViewTickerCmt,
    onCommentPost,
  } = props;
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [userLoginInfo] = useAtom(userLoginInfoAtom);
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const { isLogin } = useAuth();
  const [postData, setPostData] = useState(data);
  const router = useRouter();
  const isPageMyProfile = router.pathname === ROUTE_PATH.MY_PROFILE;
  // React.useEffect(() => {
  //   setPostData(data);
  // }, [data]);
  const isMyPost = postData?.customerId === userLoginInfo?.id;
  const isMyComment = postData?.children?.[0]?.customerInfo?.customerId === userLoginInfo?.id;
  const { findItemFollow, itemLike, idPostAddComment, isChangeMyProfile } = React.useMemo(() => {
    const findItemFollow = postDetailStatus?.idCustomerFollow === postData?.customerId;
    const idPostAddComment = postDetailStatus?.idPostAddComment === postData?.id;
    const isChangeMyProfile = postDetailStatus?.isChangeMyProfile && (isMyPost || isMyComment);
    // const findPostAddComment = postDetailStatus?.isAddCommentPostDetail?.findIndex(
    //   (item: string) => item === postData?.id,
    // );
    const itemLike = postDetailStatus?.idPostLike === postData?.id;
    return { findItemFollow, itemLike, idPostAddComment, isChangeMyProfile };
  }, [postDetailStatus?.idCustomerFollow, postDetailStatus?.idPostAddComment]);
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
    if (
      findItemFollow ||
      isChangeMyProfile ||
      idPostAddComment ||
      postDetailStatus?.idPostHideComment ||
      itemLike
    ) {
      refresh();
      if (onRefreshList && pinned) {
        onRefreshList();
      }
    }
  }, [
    findItemFollow,
    postDetailStatus?.idPostLike,
    isChangeMyProfile,
    idPostAddComment,
    postDetailStatus?.idPostHideComment,
  ]);
  React.useEffect(() => {
    if (
      !idPostAddComment &&
      !findItemFollow &&
      !itemLike &&
      !postDetailStatus?.isChangeMyProfile &&
      !postDetailStatus?.idPostHideComment
    ) {
      setPostData(data);
    }
  }, [data]);
  const { refresh } = usePostDetail(data?.id, {
    onSuccess: (res: any) => {
      setPostData(res?.data);
      onCommentPost && onCommentPost(res?.data);
      if (!isPageMyProfile) {
        setPostDetailStatus({
          ...postDetailStatus,
          // isAddCommentPostDetail: [],
          idPostAddComment: '',
          idPostHideComment: '',
          idCustomerFollow: 0,
          isChangeMyProfile: false,
        });
      }

      refreshSearch && refreshSearch();
    },
    manual: true,
  });
  const onNavigate = () => {
    ClickaPost(postData?.id, postType, hashtags, Ticker, Link, themeName);
    router.push(`/post/${postData?.id}`);
    setSearchSeo(false);
    globalThis?.sessionStorage.setItem('scrollPosition', String(window?.scrollY));
  };

  const [, setImageCommentMobile] = useState(false);

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
    // refreshCommentOfPost();
  };

  if (loading && !pinned) {
    return <NewsFeedSkeleton />;
  }

  return (
    <>
      <div
        className={classNames(
          'box-shadow mb-5 rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white p-[12px] desktop:p-[16px]',
          {
            'galaxy-max:p-[10px]': isNewFeedExplore,
          },
        )}
      >
        <NewFeedItem
          onNavigate={onNavigate}
          postDetail={postData}
          totalComments={postData?.totalChildren}
          onRefreshPostDetail={onRefreshPostItem}
          refreshFollow={refresh}
          pinned={pinned}
          isNewFeedExplore={isNewFeedExplore}
          isSearchSeoBox={isSearchSeoBox}
          onTrackingViewTicker={onTrackingViewTicker}
        />
        {isLogin && !isNewFeedExplore && !hiddenComment && (
          <div className='mt-4 galaxy-max:mt-2 tablet:block desktop:ml-[64px]'>
            <CommentField
              id={postData?.id}
              refresh={refreshComment}
              refreshTotal={() => {}}
              setImageCommentMobile={setImageCommentMobile}
            />
          </div>
        )}
        {!!countComment && !isNewFeedExplore && !hiddenComment && (
          <div className=' desktop:ml-[64px]'>
            {countComment > 0 && (
              <div className='mt-[22px] galaxy-max:mt-[18px]'>
                <ItemComment
                  onNavigate={onNavigate}
                  data={postData?.children?.[0]}
                  idPost={postData?.id}
                  refreshCommentOfPOst={refreshComment}
                  totalChildren={postData?.children?.[0]?.totalChildren}
                  onTrackingViewTicker={onTrackingViewTickerCmt}
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
