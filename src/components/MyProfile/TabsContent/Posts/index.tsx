import React from 'react';

import { useGetMYPost } from '@components/MyProfile/service';
import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';

import NotFound from './NotFound';
import useLoadMore from './useLoadMore';

const Posts = () => {
  const { data, refresh, run, loading } = useGetMYPost();

  const { lastElementRef } = useLoadMore(data, loading, run);
  return (
    <div>
      {!data?.list?.length && <NotFound />}
      {data?.list?.map((item: IPost, index: number) => {
        if (index === data?.list.length - 1) {
          return (
            <div ref={lastElementRef} key={index}>
              <NewsFeed
                key={index}
                data={item}
                id={item.id}
                refresh={() => {
                  refresh();
                }}
              />
              ;
            </div>
          );
        }
        return (
          <NewsFeed
            key={index}
            data={item}
            id={item.id}
            refresh={() => {
              refresh();
            }}
          />
        );
      })}
    </div>
  );
};
export default Posts;
