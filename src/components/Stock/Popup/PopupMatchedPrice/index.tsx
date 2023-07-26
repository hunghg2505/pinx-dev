import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IPopupMatchedPriceProps {
  visible: boolean;
  onClose: () => void;
}

const POPUP_CLASS_NAME = 'popup-matched-price';

const PopupMatchedPrice = ({ visible, onClose }: IPopupMatchedPriceProps) => {
  const [popupWidth, setPopupWidth] = useState<number | undefined>();

  useEffect(() => {
    const handleResize = () => {
      const popupElement = document.querySelector(`.${POPUP_CLASS_NAME}`);
      const popupContentElm = popupElement?.querySelector('.rc-dialog-content');
      const popupClientWidth = popupContentElm?.clientWidth;

      popupClientWidth !== popupWidth && setPopupWidth(popupClientWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [popupWidth]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      className={classNames(styles.popupMatchedPrice, POPUP_CLASS_NAME)}
    >
      <Text type='body-16-bold' color='primary-5' className='text-center'>
        Matched Price
      </Text>

      <table className='mt-[20px] text-right' style={{ width: `${popupWidth}px` }}>
        <thead className='table w-[calc(100%-1em)] table-fixed'>
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

        <tbody className='block max-h-[calc(70vh-40px-44px)] overflow-auto'>
          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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

          <tr className='table w-full table-fixed'>
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
      </table>
    </Modal>
  );
};

export default PopupMatchedPrice;
