import { getCommentsOfPost } from '@components/Post/service/getCommentsOfPost';
import { getCommentsOfPostAuth } from '@components/Post/service/getCommentsOfPostAuth';
import { getAccessToken } from '@store/auth';

export async function getMoreCommentPost(postId: string, nextId: string): Promise<any> {
  const params = {
    limit: 20,
    last: nextId ?? '',
  };
  const isLogin = !!getAccessToken();
  const r = isLogin
    ? await getCommentsOfPostAuth(postId, params)
    : await getCommentsOfPost(postId, params);
  return {
    list: r?.data?.list,
    nextId: r?.data?.hasNext ? r?.data?.last : false,
  };
}
