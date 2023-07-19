import React, { useState } from 'react';

import PopupMatchedPrice from '@components/Stock/Popup/PopupMatchedPrice';
import Text from '@components/UI/Text';

const MatchingsTab = () => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <table className='w-full text-right'>
        <thead>
          <tr className='bg-[#EBEBEB] text-right'>
            <th className='py-[5px] pl-[16px] text-left'>
              <Text type='body-12-regular' color='primary-5'>
                Time
              </Text>
            </th>
            <th className='py-[5px]'>
              <Text type='body-12-regular' color='primary-5'>
                Vol
              </Text>
            </th>
            <th className='py-[5px]'>
              <Text type='body-12-regular' color='primary-5'>
                Price
              </Text>
            </th>
            <th className='py-[5px] pr-[16px]'>
              <Text type='body-12-regular' color='primary-5'>
                +/-
              </Text>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className='py-[10px] pl-[16px] text-left'>
              <Text type='body-16-regular' className='text-[#999999]'>
                14:45:02
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                705,700
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                27.7
              </Text>
            </td>
            <td className='py-[10px] pr-[16px]'>
              <div className='inline-flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
                <Text type='body-16-semibold' color='cbwhite'>
                  0.45
                </Text>
              </div>
            </td>
          </tr>

          <tr>
            <td className='py-[10px] pl-[16px] text-left'>
              <Text type='body-16-regular' className='text-[#999999]'>
                14:45:02
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                705,700
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                27.7
              </Text>
            </td>
            <td className='py-[10px] pr-[16px]'>
              <div className='inline-flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
                <Text type='body-16-semibold' color='cbwhite'>
                  0.45
                </Text>
              </div>
            </td>
          </tr>

          <tr>
            <td className='py-[10px] pl-[16px] text-left'>
              <Text type='body-16-regular' className='text-[#999999]'>
                14:45:02
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                705,700
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                27.7
              </Text>
            </td>
            <td className='py-[10px] pr-[16px]'>
              <div className='inline-flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
                <Text type='body-16-semibold' color='cbwhite'>
                  0.45
                </Text>
              </div>
            </td>
          </tr>

          <tr>
            <td className='py-[10px] pl-[16px] text-left'>
              <Text type='body-16-regular' className='text-[#999999]'>
                14:45:02
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                705,700
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                27.7
              </Text>
            </td>
            <td className='py-[10px] pr-[16px]'>
              <div className='inline-flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
                <Text type='body-16-semibold' color='cbwhite'>
                  0.45
                </Text>
              </div>
            </td>
          </tr>

          <tr>
            <td className='py-[10px] pl-[16px] text-left'>
              <Text type='body-16-regular' className='text-[#999999]'>
                14:45:02
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                705,700
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                27.7
              </Text>
            </td>
            <td className='py-[10px] pr-[16px]'>
              <div className='inline-flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
                <Text type='body-16-semibold' color='cbwhite'>
                  0.45
                </Text>
              </div>
            </td>
          </tr>

          <tr>
            <td className='py-[10px] pl-[16px] text-left'>
              <Text type='body-16-regular' className='text-[#999999]'>
                14:45:02
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                705,700
              </Text>
            </td>
            <td className='py-[10px]'>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                27.7
              </Text>
            </td>
            <td className='py-[10px] pr-[16px]'>
              <div className='inline-flex h-[21px] items-center justify-end rounded-[4px] bg-[#DA314F] pl-[15px] pr-[4px]'>
                <Text type='body-16-semibold' color='cbwhite'>
                  0.45
                </Text>
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={4} className='pt-[24px]'>
              <Text
                onClick={() => {
                  setOpenPopup(true);
                }}
                type='body-14-medium'
                className='cursor-pointer text-center text-[#3449D7] tablet:hidden'
              >
                VIEW MORE
              </Text>

              <div className='hidden px-[24px] tablet:block'>
                <button
                  onClick={() => {
                    setOpenPopup(true);
                  }}
                  className='mt-[8px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'
                >
                  <Text type='body-14-bold' color='primary-2'>
                    VIEW MORE
                  </Text>
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      <PopupMatchedPrice visible={openPopup} onClose={() => setOpenPopup(false)} />
    </>
  );
};

export default MatchingsTab;
