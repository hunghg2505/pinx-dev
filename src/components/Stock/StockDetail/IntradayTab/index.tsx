import React from 'react';

import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

const IntradayTab = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='tablet:px-[24px]'>
      <table className='w-full border-collapse text-center'>
        <thead>
          <tr>
            <th className='border-y border-solid border-[#ccc] '>
              <Text type='body-12-regular' color='primary-5' className='bg-[#EBEBEB] py-[6px]'>
                {t('intraday.price')}
              </Text>
            </th>
            <th className='border border-solid border-[#ccc] '>
              <Text type='body-12-regular' color='primary-5' className='bg-[#EBEBEB] py-[6px]'>
                {t('intraday.total_volume')}
              </Text>
            </th>
            <th className='border-y border-solid border-[#ccc] '>
              <Text type='body-12-regular' color='primary-5' className='bg-[#EBEBEB] py-[6px]'>
                {t('intraday.range')}
              </Text>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className='py-[16px] align-middle'>
              <div className='h-[2px] bg-[#3449D7]'></div>
            </td>

            <td className='border-x border-solid border-[#ccc] align-middle'>
              <div className='h-[2px] bg-[#3449D7]'></div>
            </td>

            <td className='align-middle'>
              <div className='flex items-center'>
                <div className='h-[2px] w-1/2 bg-[#3449D7]'></div>
                <div className='flex h-[16px] -translate-x-1/4 items-center justify-center rounded-[4px] bg-[#3449D7] px-[4px]'>
                  <Text type='body-12-regular' color='cbwhite'>
                    29.2
                  </Text>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td className='px-[6px] py-[8px] align-middle'>
              <Text type='body-16-semibold' className='text-right text-[#0D0D0D]'>
                27.45
              </Text>
            </td>

            <td className='border-x border-solid border-[#ccc] align-middle'>
              <div className='flex items-center'>
                <div className='h-[21px] w-[10px] rounded-br-[4px] rounded-tr-[4px] bg-[var(--semantic-2-1)]'></div>

                <Text type='body-12-semibold' className='ml-[8px]'>
                  14.9K
                </Text>
              </div>
            </td>

            <td></td>
          </tr>

          <tr>
            <td className='relative px-[6px] py-[8px] align-middle after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[2px] after:-translate-y-1/2 after:bg-[#E6A70A] after:content-[""]'>
              <Text type='body-16-semibold' className='relative z-10 text-right text-[#0D0D0D]'>
                27.45
              </Text>
            </td>

            <td className='relative border-x border-solid border-[#ccc] align-middle after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[2px] after:-translate-y-1/2 after:bg-[#E6A70A] after:content-[""]'>
              <div className='flex items-center'>
                <div className='z-10 h-[21px] w-[90px] rounded-br-[4px] rounded-tr-[4px] bg-[#EAA100]'></div>

                <Text type='body-12-semibold' className='z-10 ml-[8px]'>
                  14.9K
                </Text>
              </div>
            </td>

            <td className='align-middle'>
              <div className='flex items-center'>
                <div className='h-[2px] w-1/2 bg-[#EAA100]'></div>
                <div className='flex h-[16px] -translate-x-1/4 items-center justify-center rounded-[4px] bg-[#EAA100] px-[4px]'>
                  <Text type='body-12-regular' color='cbwhite'>
                    25.4
                  </Text>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td className='px-[6px] py-[8px] align-middle'>
              <Text type='body-16-semibold' className='text-right text-[#0D0D0D]'>
                27.45
              </Text>
            </td>

            <td className='border-x border-solid border-[#ccc] align-middle'>
              <div className='flex items-center'>
                <div className='h-[21px] w-[120px] rounded-br-[4px] rounded-tr-[4px] bg-[var(--semantic-1)]'></div>

                <Text type='body-12-semibold' className='ml-[8px]'>
                  14.9K
                </Text>
              </div>
            </td>

            <td></td>
          </tr>

          <tr>
            <td className='px-[6px] py-[8px] align-middle'>
              <Text type='body-16-semibold' className='text-right text-[#0D0D0D]'>
                27.45
              </Text>
            </td>

            <td className='border-x border-solid border-[#ccc] align-middle'>
              <div className='flex items-center'>
                <div className='h-[21px] w-[70px] rounded-br-[4px] rounded-tr-[4px] bg-[var(--semantic-1)]'></div>

                <Text type='body-12-semibold' className='ml-[8px]'>
                  14.9K
                </Text>
              </div>
            </td>

            <td></td>
          </tr>

          <tr>
            <td className='px-[6px] py-[8px] align-middle'>
              <Text type='body-16-semibold' className='text-right text-[#0D0D0D]'>
                27.45
              </Text>
            </td>

            <td className='border-x border-solid border-[#ccc] align-middle'>
              <div className='flex items-center'>
                <div className='h-[21px] w-[170px] rounded-br-[4px] rounded-tr-[4px] bg-[var(--semantic-1)]'></div>

                <Text type='body-12-semibold' className='ml-[8px]'>
                  14.9K
                </Text>
              </div>
            </td>

            <td></td>
          </tr>

          <tr>
            <td className='py-[16px] align-middle'>
              <div className='h-[2px] bg-[#5AC4C0]'></div>
            </td>

            <td className='border-x border-solid border-[#ccc] align-middle'>
              <div className='h-[2px] bg-[#5AC4C0]'></div>
            </td>

            <td className='align-middle'>
              <div className='flex items-center'>
                <div className='h-[2px] w-1/2 bg-[#5AC4C0]'></div>
                <div className='flex h-[16px] -translate-x-1/4 items-center justify-center rounded-[4px] bg-[#5AC4C0] px-[4px]'>
                  <Text type='body-12-regular' color='cbwhite'>
                    25.4
                  </Text>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IntradayTab;
