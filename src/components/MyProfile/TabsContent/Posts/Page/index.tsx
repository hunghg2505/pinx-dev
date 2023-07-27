import React, { memo } from 'react';

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
  const { data } = useGetMYPost(
    {
      onSuccess: (res: any) => {
        setState((prev: any) => ({
          ...prev,
          last: res?.data?.last,
          hasNext: res?.data?.hasNext,
          notFound: res?.last === undefined && !res?.data?.list?.length && prev.pages.length === 0,
        }));
      },
      refreshDeps: [last],
    },
    last,
  );
  return (
    <>
      {data?.data?.list?.map((item: IPost) => {
        return <NewsFeed key={`my-post-item-${item.id}`} data={item} />;
      })}
    </>
  );
};
export default memo(Page);
