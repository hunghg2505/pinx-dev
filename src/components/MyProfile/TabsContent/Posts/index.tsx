import React from 'react';

import { useGetMYPost } from '@components/MyProfile/service';
import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';

import NotFound from './NotFound';
import useLoadMore from './useLoadMore';

const Posts = () => {
  const { data, run, loading } = useGetMYPost();

  const { lastElementRef } = useLoadMore(data, loading, run);

  return (
    <div>
      {!data?.list?.length && <NotFound />}

      {data?.list?.map((item: IPost, index: number) => {
        if (index === data?.list.length - 1) {
          return (
            <div ref={lastElementRef} key={`my-post-${item.id}`}>
              <NewsFeed data={item} />
            </div>
          );
        }

        return <NewsFeed key={`my-post-${item.id}`} data={item} />;
      })}
    </div>
  );
};
export default Posts;
