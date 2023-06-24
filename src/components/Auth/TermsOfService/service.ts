import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IParamsReadContract {
  link: string;
  session: string;
}

export const serviceReadContract = async (values: IParamsReadContract) => {
  return privateRequest(requestPist.get, API_PATH.READ_CONTRACT, {
    params: values,
  });
};
