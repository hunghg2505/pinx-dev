import Text from '@components/UI/Text';

const Community = () => {
  const oneWatching = () => {
    return (
      <div className='flex flex-col content-center items-center justify-center'>
        <div className=''>
          <img
            src='/static/images/influencer.jpg'
            alt=''
            width='0'
            height='0'
            className='h-[38px] w-[38px] justify-items-center rounded-full rounded-full border-2 border-solid border-[#EAF4FB]'
          />
        </div>
        <div className='mt-[-10px] flex h-[24px] w-[24px] content-center items-center justify-center rounded-full bg-[#FFFFFF] shadow shadow-xl'>
          <img
            src='/static/icons/heart-red.svg'
            alt=''
            width='0'
            height='0'
            className='h-[16px] w-[16px]'
          />
        </div>
      </div>
    );
  };
  return (
    <div className='px-[16px]'>
      <Text>Community</Text>
      <Text>Who is watching this theme</Text>
      <div className='flex items-center'>
        <div>{oneWatching()}</div>
        <div>{oneWatching()}</div>
        <div>{oneWatching()}</div>
      </div>
    </div>
  );
};
export default Community;
