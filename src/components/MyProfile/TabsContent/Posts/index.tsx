import { useRequest } from 'ahooks';

import { getMyPost } from '@components/MyProfile/TabsContent/Posts/service';
import NewsFeed from '@components/Post/NewsFeed';
import SkeletonLoading from '@components/UI/Skeleton';
import useObserver from '@hooks/useObserver';

import NotFound from './NotFound';

const Posts = () => {
  const { data, loading, mutate, runAsync, refresh } = useRequest(async (nextId: any) => {
    if (nextId === false) {
      return;
    }

    return getMyPost(nextId);
  });

  const service = async () => {
    if (!data?.nextId || loading) {
      return;
    }

    const newData: any = await runAsync(data?.nextId);

    if (newData?.list?.length) {
      mutate({
        list: [...data?.list, ...newData?.list],
        nextId: newData?.nextId,
      });
    }
  };

  const { refLastElement } = useObserver();

  if (loading && !data?.list?.length) {
    return (
      <div>
        <SkeletonLoading />
      </div>
    );
  }

  if (!loading && !data?.list?.length) {
    return <NotFound refresh={refresh} />;
  }

  return (
    <div>
      <div>
        {data?.list?.map((item: any, idx: number) => {
          if (idx + 1 === data?.list?.length) {
            return (
              <div ref={(node) => refLastElement(node, service)} key={`my-post-${item?.id}`}>
                <NewsFeed data={item} onRemoveData={refresh} />
              </div>
            );
          }

          return (
            <div key={`my-post-${item?.id}`}>
              <NewsFeed data={item} onRemoveData={refresh} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Posts;
