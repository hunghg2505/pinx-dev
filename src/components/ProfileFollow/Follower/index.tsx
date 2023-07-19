import React from 'react';

// import { useRouter } from 'next/router';

import UserFolow from '@components/common/UserFolow';

// import { useCustomerFollower } from '../service';

const Follower = () => {
  // const router = useRouter();
  // const { data } = useCustomerFollower(String(router?.query?.search), String(router?.query?.id));

  // console.log(data);
  return (
    <div className='flex flex-col gap-[8px]'>
      <UserFolow
        avatar='https://i.pinimg.com/736x/68/ae/65/68ae655966769e0ac7284d80ca02a8b4.jpg'
        displayName='Lisa Simpson'
        isFollow={false}
        id={556}
      />
      <UserFolow
        avatar='https://i.pinimg.com/236x/27/2f/65/272f654a47b56b7159d7b38d474e93e9.jpg'
        displayName='Lisa Simpson'
        isFollow={true}
        id={556}
      />
    </div>
  );
};
export default Follower;
