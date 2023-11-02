import { NEWFEED_LIST } from '@api/constant';
import { requestCommunity } from '@api/request';
import { requestGetList } from '@components/Home/service/requestGetList';
import { getAccessToken } from '@store/auth';

export const serviceGetNewFeed = async (type: any, last?: string) => {
  const isLogin = !!getAccessToken();

  const params: any = {
    filterType: type,
    last: last || '',
  };

  if (isLogin) {
    const r = await requestGetList(params);
    return {
      list: r?.data?.list,
      nextId: r?.data?.hasNext ? r?.data?.last : false,
      type,
    };
  }

  const r = await requestCommunity.get(NEWFEED_LIST, { params });

  return {
    list: r?.data?.list,
    nextId: r?.data?.hasNext ? r?.data?.last : false,
    type,
  };
};
