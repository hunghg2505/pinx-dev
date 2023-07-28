import React from 'react';

// import { useAtom } from 'jotai';
// import { useRouter } from 'next/router';

// import { openProfileAtom } from '@store/profile/profile';

import BackDesktop from './BackDesktop';
// import BackMobile from './BackMobile';

const Back = () => {
  // const router = useRouter();
  // const fromProfileMenu = router.query.from_profile_menu;
  // const [, setOpenProfileMenu] = useAtom(openProfileAtom);

  return (
    <>
      {/* <BackMobile
        onClick={() => {
          if (fromProfileMenu) {
            setOpenProfileMenu(true);
          }
          router.back();
        }}
      /> */}
      <BackDesktop />
    </>
  );
};
export default Back;
