import { useRequest } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

import { IComment, requestLikeComment, requestUnLikeComment } from '@components/Post/service';
import Fancybox from '@components/UI/Fancybox';
import Text from '@components/UI/Text';
import { USERTYPE, useUserType } from '@hooks/useUserType';
import { formatMessage } from '@utils/common';
import PopupComponent from '@utils/PopupComponent';

import ModalReportComment from './ModalReportComment';

dayjs.extend(relativeTime);
interface IProps {
  onNavigate?: () => void;
  onReplies?: (value: string, customerId: number, id: string) => void;
  data: IComment;
  refresh: () => void;
}
const ItemComment = (props: IProps) => {
  const { statusUser, isLogin } = useUserType();
  const { onNavigate, data, onReplies, refresh } = props;
  const onComment = (value: string, customerId: number, id: string) => {
    if (!isLogin) {
      PopupComponent.open();
      return;
    }

    if (onNavigate) {
      onNavigate();
    } else {
      onReplies && onReplies(value, customerId, id);
    }
  };
  const message = data?.message && formatMessage(data?.message, data);
  const name = data?.customerInfo?.name || '';
  const isLike = data?.isLike;
  const numberReport = data?.reports?.length > 0 ? data?.reports.length : '';
  const urlImage =
    data?.urlImages?.length > 0 ? data?.urlImages?.[0] : '/static/images/influencer.jpg';
  const useLike = useRequest(
    () => {
      return requestLikeComment(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
      },
    },
  );
  const useUnLike = useRequest(
    () => {
      return requestUnLikeComment(data.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
      },
    },
  );
  const onLike = () => {
    if (statusUser === USERTYPE.ACTIVE) {
      if (statusUser !== USERTYPE.VSD) {
        PopupComponent.openEKYC();
      } else if (isLike) {
        useUnLike.run();
      } else {
        useLike.run();
      }
    } else {
      PopupComponent.open();
    }
  };
  return (
    <div className='comment p-[16px]'>
      <div className='flex flex-row items-start'>
        <Image
          src={data?.customerInfo?.avatar || ''}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='mr-[12px] w-[36px] rounded-full'
        />

        <div className='content w-full'>
          <div className='relative rounded-[12px] bg-[#F6FAFD] px-[16px] py-[12px] [box-shadow:0px_1px_2px_rgba(0,_0,_0,_0.12)]'>
            <div className='mb-[12px] flex w-full flex-row items-center justify-between border-b border-solid border-[#E6E6E6] pb-[12px]'>
              <Text type='body-14-bold' color='neutral-1'>
                {data?.customerInfo?.name}
              </Text>
              <Text type='body-12-medium' color='neutral-5'>
                {dayjs(data?.timeString).fromNow()}
              </Text>
            </div>
            <Text type='body-14-medium' color='primary-5'>
              {message && (
                <div dangerouslySetInnerHTML={{ __html: message }} className='messageFormat'></div>
              )}
            </Text>

            {data?.totalLikes > 0 && (
              <div className='absolute -bottom-3 right-0 flex h-[24px] w-[54px] flex-row items-center justify-center rounded-[100px] bg-[#F3F2F6]'>
                <Image
                  src='/static/icons/iconLike.svg'
                  alt=''
                  width='0'
                  height='0'
                  className='mr-[10px] w-[15px]'
                />
                <Text type='body-12-regular' color='primary-1'>
                  {data?.totalLikes}
                </Text>
              </div>
            )}
          </div>
          {data?.urlImages?.length > 0 && (
            <Fancybox>
              <a data-fancybox='gallery' href={urlImage}>
                <Image
                  src={urlImage}
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='mt-[10px] h-[100px] w-[100px] rounded-[8px]'
                />
              </a>
            </Fancybox>
          )}

          <div className='action mt-[11px] flex'>
            <div className='like mr-[38px] flex cursor-pointer' onClick={onLike}>
              <Text
                type='body-14-regular'
                className={classNames({
                  'text-[#589DC0]': data.isLike,
                  'text-[#808080]': !data.isLike,
                })}
              >
                Like
              </Text>
            </div>
            <div
              className='comment mr-[38px] flex cursor-pointer'
              onClick={() => onComment(name, data?.customerId, data?.id)}
            >
              <Text type='body-14-regular' color='neutral-4' className='mr-[3px]'>
                {data?.children?.length > 0 ? data?.children?.length : ''}
              </Text>
              <Text type='body-14-regular' color='neutral-4'>
                Reply
              </Text>
            </div>
            <ModalReportComment postID={data?.id}>{numberReport} Report</ModalReportComment>
            {/* <Fancybox>
                <a data-fancybox='gallery' href='/static/images/image_post.jpg'>
                  <Image alt='' src='/static/images/image_post.jpg' width='200' height='150' />
                </a>
              </Fancybox> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemComment;
