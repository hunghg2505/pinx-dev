import request from 'umi-request';

interface IResult {
  list: string[];
  nextId: string | undefined;
}

const requestGetPrice = (params?: object) => {
  return request.get(
    'https://uatapi.pinex.vn/community/public/stock/VCB/watching-investing-customers',
    {
      params,
    },
  );
};

export const getLoadMoreList = async (nextId: string, limit: number): Promise<IResult> => {
  const data = await requestGetPrice({
    last: nextId,
    limit,
  });

  return {
    list: data?.data.list,
    nextId: data?.data.last,
  };
};
