import React, { memo, useContext } from 'react';

import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';
import { profileUserContext } from '@components/Profile';

import { useGetPost } from './useGetPost';

const Page = ({
  last,
  setState = () => {},
}: {
  last?: string | null;
  setState?: (totalPages: any) => void;
}) => {
  const profileUser = useContext<any>(profileUserContext);
  const { data } = useGetPost(
    profileUser.id,
    {
      onSuccess: (res: any) => {
        setState((prev: any) => ({
          ...prev,
          last: res?.data?.last,
          hasNext: res?.data?.hasNext,
          notFound: res?.last === undefined && !res?.data?.list?.length && prev.pages.length === 0,
        }));
      },
    },
    last,
  );
  return (
    <>
      {data?.data?.list?.map((item: IPost) => {
        return <NewsFeed key={`data-post-${item.id}`} data={item} />;
      })}
    </>
  );
};
export default memo(Page);
