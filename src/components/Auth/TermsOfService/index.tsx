import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { pdfjs, Document, Page } from 'react-pdf';

import { API_PATH } from '@api/constant';
import Text from '@components/UI/Text';
import MainHeader from '@layout/components/MainHeader';
import { ENV } from 'src/utils/env';

import styles from './index.module.scss';

const pdfPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const pdfFile =
    link &&
    PREFIX_API_PIST +
    API_PATH.READ_CONTRACT +
    '?link=' +
    encodeURIComponent(link) +
    '&session=' +
    router?.query?.session;

  return (
    <>
      <div className='mobile:hidden laptop:block'>
        <MainHeader />
      </div>
      <div>
        <Image
          src='/static/icons/back_icon.svg'
          alt=''
          width='0'
          height='0'
          className='z-999 fixed left-[10px] top-[23px] h-[28px] w-[28px] laptop:hidden'
          onClick={() => router.back()}
        />
      </div>


      <div className='sm:max-w-md md:mt-0 xl:p-0 w-full rounded-lg bg-white mobile:min-w-[600px] '>
        <div className='mt-8 text-center laptop:mt-4'>
          <Text className='mb-4 font-[700] mobile:text-[20px] laptop:text-[30px] laptop:text-[--primary-2]'>
            Terms & Conditions
          </Text>
        </div>
        <div className='w-full border-b-[1px] border-solid border-[#D9D9D9]  laptop:hidden' />

        {link ? (
          <>
            {pdfPages.map((item: number) => (
              <Document
                file={pdfFile}
                className={styles.pdfContainer}
                key={item}
              >
                <Page pageNumber={item} className='page' />
              </Document>
            ))}

          </>
        ) : (
          <iframe
            className='min-h-screen w-full'
            src='https://pinetree.vn/html/pinex-disclosures.html'
          ></iframe>
        )}
      </div>
    </>
  );
};

export default TermsOfService;
