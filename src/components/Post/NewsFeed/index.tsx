import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import ItemComment from './ItemComment';
import NewFeedItem from './NewFeedItem';
import { IPost, useCommentsOfPost } from '../service';

interface IProps {
  data: IPost;
  id: string;
  refresh: () => void;
  onHidePost?: (id: string) => void;
  pinned?: boolean;
}
const NewsFeed = (props: IProps) => {
  const { t } = useTranslation('home');
  const { data, refresh, id, onHidePost, pinned = false } = props;
  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${data?.id}`);
  };

  const { commentsOfPost, refreshCommentOfPost } = useCommentsOfPost(String(data?.id));
  const totalComments = commentsOfPost?.data?.list?.length;
  const commentChild = commentsOfPost?.data?.list?.reduce(
    (acc: any, current: any) => acc + current?.totalChildren,
    0,
  );

  const countComment = totalComments + commentChild;

  const ViewMore = () => {
    if (countComment > 1) {
      return (
        <div
          className='mb-[5px] mt-[15px] flex h-[36px] cursor-pointer flex-row items-center justify-center rounded-[4px] bg-[#EAF4FB]'
          onClick={onNavigate}
        >
          <Text type='body-14-medium' color='primary-2'>
            {t('view_more')} {countComment - 1} {t('comments')}...
          </Text>
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <div className='mb-5 rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white p-[12px] desktop:p-[16px]'>
        <NewFeedItem
          onNavigate={onNavigate}
          postDetail={data}
          totalComments={countComment}
          onRefreshPostDetail={refresh}
          postId={id}
          onHidePostSuccess={onHidePost}
          pinned={pinned}
        />

        {!!countComment && (
          <div className=' [border-top:1px_solid_#EBEBEB] desktop:ml-[64px]'>
            {countComment > 0 && (
              <div className='mt-[22px]'>
                <ItemComment
                  onNavigate={onNavigate}
                  data={commentsOfPost?.data?.list?.[0]}
                  refresh={refresh}
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
