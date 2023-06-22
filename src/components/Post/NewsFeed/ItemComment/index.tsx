import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';

import { IComment } from '@components/Post/service';
import Text from '@components/UI/Text';
import { formatMessage } from '@utils/common';

dayjs.extend(relativeTime);
interface IProps {
  onNavigate?: () => void;
  onReplies?: (value: string) => void;
  data?: IComment;
}
const ItemComment = (props: IProps) => {
  const { onNavigate, data, onReplies } = props;
  const onComment = (value: string) => {
    if (onNavigate) {
      onNavigate();
    } else {
      onReplies && onReplies(value);
    }
  };
  const message = data?.message && formatMessage(data?.message, data);
  const name = data?.customerInfo?.name || '';
  return (
    <div className='comment p-[16px]'>
      <div className='flex flex-row items-start'>
        <Image
          src={data?.customerInfo?.avatar || ''}
          alt=''
          width='0'
          height='0'
          className='mr-[12px] w-[36px] rounded-full'
        />

        <div className='content w-full'>
          <div className='rounded-[12px] bg-[#F6FAFD] px-[16px] py-[12px] [box-shadow:0px_1px_2px_rgba(0,_0,_0,_0.12)]'>
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
          </div>
          <div className='action mt-[11px] flex'>
            <div className='like mr-[50px] flex cursor-pointer'>
              <Image
                src='/static/icons/iconUnLike.svg'
                alt=''
                width='0'
                height='0'
                className='mr-[10px] w-[20px]'
              />
              <Text type='body-12-medium' color='primary-5'>
                {data?.totalLikes}
              </Text>
            </div>
            <div className='comment flex cursor-pointer' onClick={() => onComment(name)}>
              <Image
                src='/static/icons/iconComment.svg'
                alt=''
                width='0'
                height='0'
                className='mr-[10px] w-[18px]'
              />
            </div>
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
