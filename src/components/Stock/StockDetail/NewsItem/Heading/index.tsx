import React, { useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import ModalReport from '@components/Post/NewsFeed/ModalReport';
import { IPost } from '@components/Post/service';
import Text from '@components/UI/Text';
import { useHandlActionsPost } from '@hooks/useHandlActionsPost';

interface IHeadingNewsItemProps {
  className?: string;
  data: IPost;
}

dayjs.extend(relativeTime);

const HeadingNewsItem = ({ className, data }: IHeadingNewsItemProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const { i18n } = useTranslation();
  const [isReport, setIsReport] = useState(data.isReport);
  const { refButtonList } = useHandlActionsPost();

  const handleReportPostSuccess = () => {
    setIsReport(true);
  };

  const ButtonAction = () => {
    if (isReport) {
      return <></>;
    }

    return (
      <button className='relative ml-[16px]'>
        <img
          src='/static/icons/iconDot.svg'
          alt='Icon dot'
          data-img-dot={true}
          className='imgDot h-[24px] w-[24px] cursor-pointer object-contain'
          ref={refButtonList as any}
        />

        <div className='popup pointer-events-none absolute right-0 top-[24px] z-10 w-[118px] rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#FFFFFF] px-[8px] opacity-0 [box-shadow:0px_3px_6px_-4px_rgba(0,_0,_0,_0.12),_0px_6px_16px_rgba(0,_0,_0,_0.08),_0px_9px_28px_8px_rgba(0,_0,_0,_0.05)]'>
          <div className='ml-[12px] flex h-[44px] items-center'>
            <img
              src='/static/icons/iconFlag.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='mr-[8px] h-[20px] w-[20px] object-contain'
            />
            <ModalReport postID={data.id} onReportSuccess={handleReportPostSuccess}>
              <Text type='body-14-medium' color='neutral-2'>
                {t('common:report')}
              </Text>
            </ModalReport>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className={classNames('flex items-center', className)}>
      <Image
        width='0'
        height='0'
        sizes='100vw'
        src={data.post.vendorInfo.logo}
        alt={data.post.vendorInfo.name}
        className='h-[24px] w-[24px] object-contain'
      />
      <Text type='body-12-regular' className='ml-[8px]' color='primary-5'>
        {data.post.vendorInfo.name}
      </Text>

      <Text type='body-12-regular' className='ml-auto text-[#999999] tablet:ml-[8px]'>
        {dayjs(data.timeString)?.locale(i18n.language)?.fromNow(true)}
      </Text>

      <ButtonAction />
    </div>
  );
};

export default HeadingNewsItem;
