import { useEffect } from 'react';

import { useRequest } from 'ahooks';
import { atom, useAtom } from 'jotai';

import { getMyPost } from '@components/MyProfile/TabsContent/Posts/service';
import NewsFeed from '@components/Post/NewsFeed';
// import { IPost } from '@components/Post/service';
import SkeletonLoading from '@components/UI/Skeleton';
import useObserver from '@hooks/useObserver';
import { ViewTickerInfo } from '@utils/dataLayer';

import NotFound from './NotFound';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string, locationDetail: string) => {
  ViewTickerInfo(stockCode, 'My profile screen', locationDetail, 'Stock');
};
const postMyProfile = atom<{ list?: any; nextId?: string }>({
  list: [],
  nextId: '',
});

const useGetPostsMyProfile = () => {
  const [dataPosts, setDataPosts] = useAtom(postMyProfile);
  const { loading, runAsync, refresh, run } = useRequest(
    async (nextId: any) => {
      if (nextId === false) {
        return;
      }

      return getMyPost(nextId);
    },
    {
      manual: true,
      onSuccess: (r: any) => {
        setDataPosts(r);
      },
    },
  );
  return { data: dataPosts, loading, runAsync, refresh, mutate: setDataPosts, run };
};

const Posts = () => {
  // const { data, loading, mutate, runAsync, refresh } = useRequest(async (nextId: any) => {
  //   if (nextId === false) {
  //     return;
  //   }

  //   return getMyPost(nextId);
  // });
  // useEffect(() => {
  //   const scrollPosition = globalThis?.sessionStorage.getItem('scrollPosition');
  //   if (scrollPosition) {
  //     window.scrollTo({ left: 0, top: Number.parseInt(scrollPosition, 10), behavior: 'smooth' });
  //     globalThis?.sessionStorage.removeItem('scrollPosition');
  //   }
  // }, []);
  const { data, loading, mutate, run, runAsync, refresh } = useGetPostsMyProfile();
  useEffect(() => run(''), []);

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
                <NewsFeed
                  onTrackingViewTickerCmt={(stockCode) =>
                    handleTrackingViewTicker(stockCode, 'Comment')
                  }
                  onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'Post')}
                  data={item}
                />
              </div>
            );
          }

          return (
            <div key={`my-post-${item?.id}`}>
              <NewsFeed
                onTrackingViewTickerCmt={(stockCode) =>
                  handleTrackingViewTicker(stockCode, 'Comment')
                }
                onTrackingViewTicker={(stockCode) => handleTrackingViewTicker(stockCode, 'Post')}
                data={item}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Posts;
