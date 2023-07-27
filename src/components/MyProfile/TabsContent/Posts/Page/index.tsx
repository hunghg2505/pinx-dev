import React from 'react';

import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';

import { useGetMYPost } from './useGetPost';

const Page = ({
  last,
  setState = () => {},
}: {
  last?: string | null;
  setState?: (totalPages: any) => void;
}) => {
  const { data, refresh } = useGetMYPost(
    {
      onSuccess: (res: any) => {
        setState((prev: any) => ({
          ...prev,
          last: res?.data?.last,
          hasNext: res?.data?.hasNext,
          notFound: res.last === undefined && !res?.data?.list?.length && prev.pages.length === 0,
        }));
      },
    },
    last,
  );
  return (
    <>
      {data?.data?.list?.map((item: IPost, index: number) => {
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
    </>
  );
};
export default Page;
