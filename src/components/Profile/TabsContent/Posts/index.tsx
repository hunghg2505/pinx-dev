import { useMemo } from 'react';

import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';

import NewsFeed from '@components/Post/NewsFeed';
import { getOtherPeoplePost } from '@components/Profile/TabsContent/Posts/service';
import SkeletonLoading from '@components/UI/Skeleton';
import useObserver from '@hooks/useObserver';
import { viewTickerInfoTracking } from 'src/mixpanel/mixpanel';

import NotFound from './NotFound';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string, locationDetail: string) => {
  viewTickerInfoTracking(stockCode, 'User detail screen', locationDetail, 'Stock');
};

const Posts = () => {
  const router = useRouter();
  const { profileSlug }: any = router.query;
  const userId = useMemo(() => {
    return profileSlug.split('-').pop();
  }, [profileSlug]);

  const { data, loading, mutate, runAsync, refresh } = useRequest(
    async (nextId: any) => {
      if (nextId === false || !userId) {
        return;
      }

      // @ts-ignore
      return getOtherPeoplePost(userId, nextId);
    },
    {
      refreshDeps: [userId],
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
                  onTrackingViewTickerCmt={(stockCode) =>
                    handleTrackingViewTicker(stockCode, 'Comment')
                  }
                  onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'Post')}
                  data={item}
                  onRemoveData={refresh}
                  currentLocation='Profile posts tab'
                />
              </div>
            );
          }

          return (
            <div key={`other-people-post-${item?.id}`}>
              <NewsFeed
                onTrackingViewTickerCmt={(stockCode) =>
                  handleTrackingViewTicker(stockCode, 'Comment')
                }
                onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'Post')}
                data={item}
                onRemoveData={refresh}
                currentLocation='Profile posts tab'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
