import React from 'react';

// import { useRouter } from 'next/router';

import BackDesktop from '@components/MyProfile/Header/Figure/Back/BackDesktop';
// import BackMobile from '@components/MyProfile/Header/Figure/Back/BackMobile';

const Back = () => {
  // const router = useRouter();
  return (
    <>
      {/* <BackMobile
        onClick={() => {
          router.back();
        }}
      /> */}
      <BackDesktop />
    </>
  );
};
export default Back;
