import React from 'react';

import Text from '@components/UI/Text';

const FinancialQuartersTab = () => {
  return (
    <table className='w-full border-separate border-spacing-0 rounded-[12px] border border-solid border-[var(--neutral-7)]'>
      <thead>
        <tr className='h-[78px]'>
          <th className='align-middle'></th>
          <th className='align-middle'>
            <Text type='body-14-bold' className='text-[#0D0D0D]'>
              Quý 1
            </Text>
            <Text type='body-12-medium' color='primary-2'>
              01/2023 - 03/2023
            </Text>
          </th>
          <th className='align-middle'></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className='border border-solid border-[var(--neutral-7)]'>
            <Text type='body-14-medium' className='text-[#999999]'>
              EPS 4Q
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              121
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FinancialQuartersTab;
