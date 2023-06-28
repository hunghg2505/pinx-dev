import React from 'react';

import { useRequest, useClickAway } from 'ahooks';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import {
  IComment,
  requestHideComment,
  requestLikeComment,
  requestUnLikeComment,
} from '@components/Post/service';
import Fancybox from '@components/UI/Fancybox';
import Text from '@components/UI/Text';
import { USERTYPE, useUserType } from '@hooks/useUserType';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { formatMessage } from '@utils/common';
import PopupComponent from '@utils/PopupComponent';

const ModalReportComment = dynamic(import('./ModalReportComment'), {
  ssr: false,
});

dayjs.extend(relativeTime);
interface IProps {
  onNavigate?: () => void;
  onReplies?: (value: string, customerId: number, id: string) => void;
  data: IComment;
  refresh: () => void;
  refreshTotal?: () => void;
  isChildren?: boolean;
}
const ItemComment = (props: IProps) => {
  const { statusUser, isLogin } = useUserType();
  const [showDelete, setShowDelete] = React.useState(false);
  const { onNavigate, data, onReplies, refresh, refreshTotal, isChildren = false } = props;
  console.log('🚀 ~ file: index.tsx:40 ~ ItemComment ~ data:', data);
  const { requestGetProfile } = useProfileInitial();
  const isComment = requestGetProfile?.id === data?.customerId;
  const ref = React.useRef<HTMLButtonElement>(null);

  const onComment = (value: string, customerId: number, id: string) => {
    const idComment = isChildren ? data?.parentId : id;
    if (isLogin) {
      if (statusUser !== USERTYPE.VSD) {
        PopupComponent.openEKYC();
      } else if (onNavigate) {
        onNavigate();
      } else {
        onReplies && onReplies(value, customerId, idComment);
      }
    } else {
      PopupComponent.open();
    }
  };
  useClickAway(() => {
    showDelete && setShowDelete(false);
  }, ref);
  const message = data?.message && formatMessage(data?.message, data);
  const name = data?.customerInfo?.displayName || '';
  const isLike = data?.isLike;
  const numberReport = data?.reports?.length > 0 ? data?.reports.length : '';
  const urlImage = data?.urlImages?.length > 0 ? data?.urlImages?.[0] : '';
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
    if (isLogin) {
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

  // hide comment
  const useHideComment = useRequest(
    () => {
      return requestHideComment(data?.id);
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
        refreshTotal && refreshTotal();
        setShowDelete(false);
      },
    },
  );
  const onShowDelete = () => {
    setShowDelete(!showDelete);
  };
  const onDelete = () => {
    useHideComment.run();
  };
  return (
    <div className='comment p-[20px]'>
      <div className='flex flex-row items-start'>
        <Image
          src={data?.customerInfo?.avatar || '/static/logo/logoPintree.svg'}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='mr-[12px] w-[36px] rounded-full'
        />
        {/* bg-[#F6FAFD] */}
        <div className='content w-full'>
          <div className='relative rounded-[12px] py-[12px]'>
            <div className='mb-[12px] flex w-full flex-row items-center justify-between'>
              <Text type='body-14-bold' color='neutral-1'>
                {data?.customerInfo?.displayName}
              </Text>
              <button className='relative flex items-center' ref={ref}>
                <Text type='body-12-medium' color='neutral-5' className='mr-[12px]'>
                  {dayjs(data?.timeString).fromNow()}
                </Text>
                {isComment && (
                  <Image
                    src='/static/icons/iconDot.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='h-[18px] w-[18px] rotate-90 transform cursor-pointer'
                    onClick={onShowDelete}
                  />
                )}

                {showDelete && (
                  <div
                    className=' absolute -bottom-[55px] right-0 flex h-[52px] w-[121px] cursor-pointer flex-row items-center justify-center rounded-bl-[12px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] bg-[#ffffff] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'
                    onClick={onDelete}
                  >
                    <Image
                      src='/static/icons/iconDelete.svg'
                      alt=''
                      width={0}
                      height={0}
                      className='mr-[8px] h-[24px] w-[24px]'
                    />
                    <Text type='body-16-regular' color='primary-5'>
                      Delete
                    </Text>
                  </div>
                )}
              </button>
            </div>
            <div className='rounded-[12px] bg-[#F3F2F6] px-[16px] py-[12px]'>
              <Text type='body-14-medium' color='primary-5'>
                {message && (
                  <div
                    dangerouslySetInnerHTML={{ __html: message }}
                    className='messageFormat'
                  ></div>
                )}
              </Text>
            </div>

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
          {urlImage !== '' && (
            <Fancybox>
              <a data-fancybox='gallery' href={urlImage}>
                {urlImage && (
                  <Image
                    src={urlImage}
                    alt=''
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='mt-[10px] h-[100px] w-[100px] rounded-[8px]'
                  />
                )}
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
            <ModalReportComment isReported={data.isReport} postID={data?.id} refresh={refresh}>
              {numberReport} Report
            </ModalReportComment>
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
