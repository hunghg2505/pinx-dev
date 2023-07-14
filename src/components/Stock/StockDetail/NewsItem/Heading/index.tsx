import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import ModalReport from '@components/Post/NewsFeed/ModalReport';
import Text from '@components/UI/Text';
import useClickOutSide from '@hooks/useClickOutside';
import { POPUP_COMPONENT_ID, RC_DIALOG_CLASS_NAME } from 'src/constant';

interface IHeadingNewsItemProps {
  className?: string;
}

const HeadingNewsItem = ({ className }: IHeadingNewsItemProps) => {
  const [modalReportVisible, setModalReportVisible] = useState(false);
  const [openPopupReport, setOpenPopupReport] = useState(false);
  const [excludeElements, setExcludeElements] = useState<(Element | null)[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const handleHidePopup = () => {
    openPopupReport && setOpenPopupReport(false);
  };

  useClickOutSide(ref, handleHidePopup, excludeElements);

  useEffect(() => {
    setExcludeElements(() => {
      return [
        document.querySelector(`#${POPUP_COMPONENT_ID}`),
        document.querySelector(`.${RC_DIALOG_CLASS_NAME}`),
      ];
    });
  }, [modalReportVisible]);

  return (
    <div className={classNames('flex items-center', className)}>
      <img
        src='https://static.pinetree.com.vn/upload/vendor_vietstock_logo.png'
        alt='VietStock logo'
        className='h-[24px] w-[24px] object-contain'
      />
      <Text type='body-12-regular' className='ml-[8px]' color='primary-5'>
        Vietstock
      </Text>

      <Text type='body-12-regular' className='ml-auto text-[#999999] tablet:ml-[8px]'>
        15 hours ago
      </Text>

      <button className='relative ml-[16px] tablet:ml-auto' ref={ref}>
        <img
          src='/static/icons/iconDot.svg'
          alt='Icon dot'
          className='h-[24px] w-[24px] cursor-pointer object-contain'
          onClick={() => setOpenPopupReport((prev) => !prev)}
        />

        {openPopupReport && (
          <div className='popup absolute right-0 top-[24px] z-10 w-[118px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
            <div className='ml-[12px] flex h-[44px] items-center'>
              <img
                src='/static/icons/iconFlag.svg'
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='mr-[8px] h-[20px] w-[20px] object-contain'
              />
              <ModalReport
                visible={modalReportVisible}
                onModalReportVisible={setModalReportVisible}
                postID={'123'}
                onReportSuccess={() => {
                  console.log(123);
                }}
              >
                <Text type='body-14-medium' color='neutral-2'>
                  Report
                </Text>
              </ModalReport>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default HeadingNewsItem;
