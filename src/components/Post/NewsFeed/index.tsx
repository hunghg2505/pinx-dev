import { useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';

import ItemComment from './ItemComment';
import NewFeedItem from './NewFeedItem';
import { IPost, useCommentsOfPost } from '../service';

interface IProps {
  data: IPost;
  pinned?: boolean;
  onRefreshList?: () => void;
  onRemoveData?: () => void;
}
const NewsFeed = (props: IProps) => {
  const { t } = useTranslation('home');
  const { data, pinned = false, onRefreshList, onRemoveData } = props;

  const [postData, setPostData] = useState(data);

  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${postData?.id}`);
  };

  const { commentsOfPost, refreshCommentOfPost } = useCommentsOfPost(String(postData?.id));
  const totalComments = commentsOfPost?.data?.list?.length;
  const commentChild = commentsOfPost?.data?.list?.reduce(
    (acc: any, current: any) => acc + current?.totalChildren,
    0,
  );

  const countComment = totalComments + commentChild;

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

  return (
    <>
      <div className='box-shadow mb-5 rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white p-[12px] desktop:p-[16px]'>
        <NewFeedItem
          onNavigate={onNavigate}
          postDetail={postData}
          totalComments={countComment}
          onRefreshPostDetail={onRefreshPostItem}
          pinned={pinned}
        />

        {!!countComment && (
          <div className=' [border-top:1px_solid_#EBEBEB] desktop:ml-[64px]'>
            {countComment > 0 && (
              <div className='mt-[22px]'>
                <ItemComment
                  onNavigate={onNavigate}
                  data={commentsOfPost?.data?.list?.[0]}
                  refreshCommentOfPOst={refreshCommentOfPost}
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
