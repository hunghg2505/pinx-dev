import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';

import NewsFeed from '@components/Post/NewsFeed';
import { getOtherPeoplePost } from '@components/Profile/TabsContent/Posts/service';
import SkeletonLoading from '@components/UI/Skeleton';
import useObserver from '@hooks/useObserver';
import { ViewTickerInfo } from '@utils/dataLayer';

import NotFound from './NotFound';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string) => {
  ViewTickerInfo(stockCode, 'User detail screen', 'Post', 'Stock');
};

const handleTrackingViewTickerCmt = (stockCode: string) => {
  ViewTickerInfo(stockCode, 'User detail screen', 'Comment', 'Stock');
};

const Posts = () => {
  const router = useRouter();

  const { data, loading, mutate, runAsync, refresh } = useRequest(
    async (nextId: any) => {
      if (nextId === false || !router?.query?.id) {
        return;
      }

      // @ts-ignore
      return getOtherPeoplePost(router.query?.id, nextId);
    },
    {
      refreshDeps: [router.query?.id],
    },
  );
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
    return <NotFound />;
  }

  return (
    <div>
      <div>
        {data?.list?.map((item: any, idx: number) => {
          if (idx + 1 === data?.list?.length) {
            return (
              <div
                ref={(node) => refLastElement(node, service)}
                key={`other-people-post-${item?.id}`}
              >
                <NewsFeed
                  onTrackingViewTickerCmt={handleTrackingViewTickerCmt}
                  onTrackingViewTicker={handleTrackingViewTicker}
                  data={item}
                  onRemoveData={refresh}
                />
              </div>
            );
          }

          return (
            <div key={`other-people-post-${item?.id}`}>
              <NewsFeed
                onTrackingViewTickerCmt={handleTrackingViewTickerCmt}
                onTrackingViewTicker={handleTrackingViewTicker}
                data={item}
                onRemoveData={refresh}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
