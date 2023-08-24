import React from 'react';

import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { fetchPostDetailFromServer } from '@components/Post/service';

const pagePinex = ({ postDetail }: any) => {
  console.log('postDetail', postDetail);
  return (
    <>
      <Image
        src='https://static.pinetree.com.vn/upload/images/pist/community/230801135737693-85853.jpg'
        width={400}
        height={200}
        alt=''
      />
      <Image src='/static/images/sidebar_banner.png' width={400} height={200} alt='' />
    </>
  );
};
export async function getServerSideProps({ locale, params }: any) {
  const id = params?.id;
  const postDetail = await fetchPostDetailFromServer(id);
  // const url = req.headers.referer;
  // let host;
  // if (url) {
  //   const arr = url?.split('/');
  //   host = `${arr[0]}//${arr[2]}`;
  // }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      postDetail: postDetail?.data,
      // host,
      id,
      // Will be passed to the page component as props
    },
  };
}
export default pagePinex;
