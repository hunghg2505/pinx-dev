import React from 'react';

import Text from '@components/UI/Text';

const MatchingsTab = () => {
  return (
    <table className='w-full'>
      <thead>
        <tr className='text-right'>
          <th className='text-left'>
            <Text type='body-12-regular' color='primary-5'>
              Time
            </Text>
          </th>
          <th>
            <Text type='body-12-regular' color='primary-5'>
              Vol
            </Text>
          </th>
          <th>
            <Text type='body-12-regular' color='primary-5'>
              Price
            </Text>
          </th>
          <th>
            <Text type='body-12-regular' color='primary-5'>
              +/-
            </Text>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>14:45:02</td>
          <td>705,700</td>
          <td>27.5</td>
          <td>
            <div className='flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
              <Text type='body-16-semibold' color='cbwhite'>
                0.45
              </Text>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MatchingsTab;
