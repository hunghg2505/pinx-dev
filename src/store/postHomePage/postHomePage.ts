import { useRequest } from 'ahooks';
import { atom, useAtom } from 'jotai';

import { FILTER_TYPE } from '@components/Home/ModalFilter';
import { serviceGetNewFeed } from '@components/Home/service';
import { IPost } from '@components/Post/service';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { getQueryFromUrl } from '@utils/common';

const postHomePage = atom<{ list?: IPost[]; nextId?: string; type?: string }>({
  list: [],
  nextId: '',
  type: '',
});

export const usePostHomePage = () => {
  const [dataPosts, setDataPosts] = useAtom(postHomePage);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const {
    loading: loadingPosts,
    run,
    runAsync,
    refresh,
  } = useRequest(
    async (nextId: any, type) => {
      if (nextId === false) {
        return;
      }

      return serviceGetNewFeed(type, nextId);
    },
    {
      manual: true,
      onSuccess: (r: any) => {
        setDataPosts(r);
        setPostDetailStatus({ ...postDetailStatus, isRefreshHome: false });
      },
    },
  );

  const initialHomePostData = () => {
    const query: any = getQueryFromUrl();

    run('', query?.filterType || FILTER_TYPE.MOST_RECENT);
  };

  return {
    initialHomePostData,
    loadingPosts,
    dataPosts,
    run,
    refresh,
    runAsync,
    mutate: setDataPosts,
  };
};
