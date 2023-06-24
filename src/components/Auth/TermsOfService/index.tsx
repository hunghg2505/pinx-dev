import { useRouter } from 'next/router';

import { API_PATH } from '@api/constant';
import Text from '@components/UI/Text';
import { ENV } from 'src/utils/env';

const TermsOfService = () => {
  const PREFIX_API_PIST = ENV.URL_API_PIST;
  const router = useRouter();
  const link = router?.query?.link as string;

  // const requestReadContract = useRequest(
  //   () => {
  //     const link = router?.query?.link as string;
  //     const session = router?.query?.session as string;
  //     return serviceReadContract({ link, session });
  //   },
  //   {
  //     onSuccess: () => {},
  //     onError(e) {
  //       console.log(e);
  //     },
  //   },
  // );

  return (
    <>
      <div className='mx-auto flex min-w-[98vw] flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <div className='w-full rounded-lg bg-white sm:max-w-md md:mt-0 xl:p-0'>
          <div className='mt-11'>
            <Text type='body-20-bold' className='mb-4'>
              Điều khoản sử dụng
            </Text>
          </div>
          <iframe
            className='min-h-[100vh] w-full'
            src={
              PREFIX_API_PIST +
              API_PATH.READ_CONTRACT +
              '?link=' +
              encodeURIComponent(link) +
              '&session=' +
              router?.query?.session
            }
          />
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
