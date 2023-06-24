import classNames from 'classnames';
import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import ItemComment from './ItemComment';
import NewFeedItem from './NewFeedItem';
import { IPost } from '../service';

interface IProps {
  data: IPost;
  id: string;
  refresh: () => void;
}
const NewsFeed = (props: IProps) => {
  const { data, refresh, id } = props;
  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${data?.id}`);
  };
  const renderViewMore = () => {
    if (data?.totalChildren > 1) {
      return (
        <div
          className='mx-[auto] mt-[15px] flex h-[36px] w-[calc((100%_-_32px))] cursor-pointer flex-row items-center justify-center rounded-[4px] bg-[#EAF4FB]'
          onClick={onNavigate}
        >
          <Text type='body-14-medium' color='primary-2'>
            View more {data?.totalChildren - 1} replies...
          </Text>
        </div>
      );
    }
  };
  // const { onRefreshPostDetail } = usePostDetail(id);
  return (
    <>
      <div className={classNames('bg-[#ffffff]', { 'pb-[28px]': data?.totalChildren > 1 })}>
        <NewFeedItem
          onNavigate={onNavigate}
          postDetail={data}
          totalComments={data?.totalChildren}
          onRefreshPostDetail={refresh}
          postId={id}
        />
        <div className='desktop:ml-[64px] desktop:mr-[88px]'>
          {data?.totalChildren > 0 && (
            <ItemComment onNavigate={onNavigate} data={data?.children?.[0]} refresh={refresh} />
          )}
          {renderViewMore()}
        </div>
      </div>
    </>
  );
};
export default NewsFeed;
