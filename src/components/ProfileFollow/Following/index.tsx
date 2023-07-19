import React from 'react';

// import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';

// import { useCustomerFollowing } from '../service';

const Following = () => {
  // const router = useRouter();
  // const { data } = useCustomerFollowing(String(router?.query?.search), String(router?.query?.id));

  // console.log(data);
  return (
    <>
      <UserFolow
        avatar='https://i.pinimg.com/236x/27/2f/65/272f654a47b56b7159d7b38d474e93e9.jpg'
        displayName='Lisa Simpson'
        isFollow={true}
        id={556}
      />
    </>
  );
};
export default Following;
