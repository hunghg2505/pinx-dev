import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

import styles from './index.module.scss';

const MovementsTab = () => {
  return (
    <>
      <div className='px-[16px]'>
        <div className='flex'>
          <table className='flex-1'>
            <tbody>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    Hight
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#0D0D0D]'>
                    20.55
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    Low
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#0D0D0D]'>
                    19.95
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    Last price
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#0D0D0D]'>
                    20.2
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>

          <table
            className={classNames(
              'w-[203px] border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#F5E4E7]',
              styles.tableRedBorder,
            )}
          >
            <tbody>
              <tr className='h-[32px]'>
                <td className='pl-[20px] align-middle'>
                  <Text type='body-12-semibold' className='text-[#DA314F]'>
                    20.55
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    88,000
                  </Text>
                </td>
                <div className='absolute bottom-0 left-0 h-[3px] w-[90%] border-none bg-[#f5e4e7]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[20px] align-middle'>
                  <Text type='body-12-semibold' className='text-[#DA314F]'>
                    19.95
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    261,500
                  </Text>
                </td>
                <div className='absolute bottom-0 left-0 h-[3px] w-[40%] border-none bg-[#f5e4e7]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[20px] align-middle'>
                  <Text type='body-12-semibold' className='text-[#DA314F]'>
                    20.2
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    54,000
                  </Text>
                </td>
                <div className='absolute bottom-0 left-0 h-[3px] w-[50%] border-none bg-[#f5e4e7]'></div>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mt-[12px] flex'>
          <table
            className={classNames(
              'w-[203px] border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#B6DFD1]',
              styles.tableGreenBorder,
            )}
          >
            <tbody>
              <tr className='h-[32px]'>
                <td className='pl-[12px] align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    88,000
                  </Text>
                </td>
                <td className='pr-[20px] text-right align-middle'>
                  <Text type='body-12-semibold' className='semantic-2-1'>
                    20.55
                  </Text>
                </td>
                <div className='absolute bottom-0 right-0 h-[3px] w-[50%] border-none bg-[#B6DFD1]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[12px] align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    261,500
                  </Text>
                </td>
                <td className='pr-[20px] text-right align-middle'>
                  <Text type='body-12-semibold' className='semantic-2-1'>
                    19.95
                  </Text>
                </td>
                <div className='absolute bottom-0 right-0 h-[3px] w-[20%] border-none bg-[#B6DFD1]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[12px] align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    54,000
                  </Text>
                </td>
                <td className='pr-[20px] text-right align-middle'>
                  <Text type='body-12-semibold' className='semantic-2-1'>
                    20.2
                  </Text>
                </td>
                <div className='absolute bottom-0 right-0 h-[3px] w-[70%] border-none bg-[#B6DFD1]'></div>
              </tr>
            </tbody>
          </table>

          <table className='flex-1'>
            <tbody>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='pl-[12px] text-[#474D57]'>
                    Ceiling
                  </Text>
                </td>
                <td className='text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#B349C3]'>
                    20.55
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='pl-[12px] text-[#474D57]'>
                    Ref
                  </Text>
                </td>
                <td className='text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#EAA100]'>
                    19.95
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='pl-[12px] text-[#474D57]'>
                    Floor
                  </Text>
                </td>
                <td className='text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#08AADD]'>
                    20.2
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <table className='mt-[20px] w-full'>
        <tbody>
          <tr>
            <td
              colSpan={3}
              className='border border-l-0 border-solid border-[#E6E6E6] py-[10px] text-center'
            >
              <Text type='body-12-regular' className='text-[#474D57]'>
                Total Vol.
              </Text>
              <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
                10,578,300
              </Text>
            </td>

            <td
              colSpan={3}
              className='border border-r-0 border-solid border-[#E6E6E6] py-[10px] text-center'
            >
              <Text type='body-12-regular' className='text-[#474D57]'>
                Total Vol.
              </Text>
              <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
                10,578,300
              </Text>
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              className='border border-l-0 border-solid border-[#E6E6E6] py-[10px] text-center'
            >
              <Text type='body-12-regular' className='text-[#474D57]'>
                Total Vol.
              </Text>
              <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
                10,578,300
              </Text>
            </td>

            <td colSpan={2} className='border border-solid border-[#E6E6E6] py-[10px] text-center'>
              <Text type='body-12-regular' className='text-[#474D57]'>
                Total Vol.
              </Text>
              <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
                10,578,300
              </Text>
            </td>

            <td
              colSpan={2}
              className='border border-r-0 border-solid border-[#E6E6E6] py-[10px] text-center'
            >
              <Text type='body-12-regular' className='text-[#474D57]'>
                Total Vol.
              </Text>
              <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
                10,578,300
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MovementsTab;
