import React from 'react';

import Text from '@components/UI/Text';

const FinancialAnnualTab = () => {
  return (
    <table className='w-full table-fixed border-collapse overflow-hidden rounded-[12px] border-hidden shadow-[0_0_0_1px_var(--neutral-7)]'>
      <thead>
        <tr className='h-[78px]'>
          <th className='align-middle'>
            <img
              src='/static/icons/back_icon.svg'
              alt='Previous icon'
              className='ml-[12px] h-[24px] w-[24px] cursor-pointer object-contain'
            />
          </th>
          <th className='align-middle'>
            <Text type='body-14-bold' className='mb-[12px] text-[#0D0D0D]'>
              Năm 2023
            </Text>
            <Text type='body-12-medium' color='primary-2'>
              01/2023 - 12/2023
            </Text>
          </th>
          <th className='text-right align-middle'>
            <img
              src='/static/icons/back_icon.svg'
              alt='Next icon'
              className='ml-auto mr-[12px] h-[24px] w-[24px] rotate-180 cursor-pointer object-contain'
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='text-[#999999]'>
              EPS 4Q
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              121
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='text-[#999999]'>
              BVPS
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              16,585
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='text-[#999999]'>
              P/E
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              172.22
            </Text>
          </td>
        </tr>
        <tr>
          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='text-[#999999]'>
              ROS
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              1.44
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='text-[#999999]'>
              ROEA
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              0.41
            </Text>
          </td>

          <td className='border border-solid border-[var(--neutral-7)] bg-[#F7F6F8] py-[12px] text-center'>
            <Text type='body-14-medium' className='text-[#999999]'>
              ROAA
            </Text>

            <Text type='body-16-regular' className='mt-[5px] text-[#0D0D0D]'>
              0.23
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FinancialAnnualTab;
