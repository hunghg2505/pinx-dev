import React, { useState } from 'react';

import { useRouter } from 'next/router';
import { pdfjs, Document, Page } from 'react-pdf';

import { API_PATH } from '@api/constant';
import Text from '@components/UI/Text';
import LoginHeader from '@layout/components/LoginHeader';
import { ENV } from 'src/utils/env';

import styles from './index.module.scss';

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
  const [numPages, setNumPages] = useState<any>();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  console.log(numPages);
  const pdfFile =
    PREFIX_API_PIST +
    API_PATH.READ_CONTRACT +
    '?link=' +
    encodeURIComponent(link) +
    '&session=' +
    router?.query?.session;

  function changePage(offset: any) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <LoginHeader />
      <div className='md:h-screen lg:py-0 mx-auto flex flex-col items-center justify-center px-6 py-8 mobile:min-w-[98vw]'>
        <div className='sm:max-w-md md:mt-0 xl:p-0 w-full rounded-lg bg-white'>
          <div className='mt-11'>
            <Text type='body-20-bold' className='mb-4'>
              Điều khoản sử dụng
            </Text>
          </div>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            className={styles.pdfContainer}
          >
            <Page pageNumber={pageNumber} className='page' />
          </Document>
          <div>
            <div className='pagec'>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </div>
            <div className='buttonc'>
              <button
                type='button'
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className='Pre'
              >
                Previous
              </button>
              <button type='button' disabled={pageNumber >= numPages} onClick={nextPage}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
