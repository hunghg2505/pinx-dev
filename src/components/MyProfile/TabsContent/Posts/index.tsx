import React from 'react';

import { useGetMYPost } from '@components/MyProfile/service';

import NotFound from './NotFound';

const Posts = () => {
  const { data } = useGetMYPost();

  return <>{!data?.length && <NotFound />}</>;
};
export default Posts;
