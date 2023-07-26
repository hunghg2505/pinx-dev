import Text from '@components/UI/Text';

export const ActivityTheme = ({ postDetail }: any) => {
  return (
    <div className='relative flex h-[205px] w-full rounded-lg'>
      <img
        src={postDetail?.post?.bgImage}
        alt=''
        className='absolute left-0 top-0 h-full w-full rounded-lg object-cover'
      />
      <div className='my-[18px] ml-[20px] flex w-[120px] flex-col items-center justify-around rounded-lg bg-[rgba(248,248,248,0.50)] px-2 backdrop-blur-[1px]'>
        <img
          src={
            postDetail?.post?.action === 'SUBSCRIBLE'
              ? '/static/icons/Lotus-gray.svg'
              : '/static/icons/Lotus-blue.svg'
          }
          alt=''
          className='mx-auto h-[22px] w-[22px] rounded-full bg-white'
        />
        <Text type='body-12-medium' className='mt'>
          {postDetail?.post?.action === 'UNSUBSCRIBE' ? 'Unsubscribe' : 'Subscribe'}
        </Text>
        <Text type='body-12-bold' className='text-center'>
          {postDetail?.post.themeName}
        </Text>
      </div>
    </div>
  );
};
