import React from 'react';

import Image from 'next/image';

const Test = () => {
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

export default Test;
