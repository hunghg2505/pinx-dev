import Text from '@components/UI/Text';

const Trending = () => {
  return (
    <>
      <Text type='body-16-bold' color='neutral-2' className='mb-4'>
        Trending
      </Text>
      <div className='flex flex-wrap gap-x-[18px] gap-y-[10px]'>
        <div className='inline-block rounded-[100px] border-[1px] border-solid border-[#C8E2F4] px-[10px] py-[6px]'>
          <Text type='body-14-medium' color='primary-2'>
            #MacroEconomy
          </Text>
        </div>
        <div className='inline-block rounded-[100px] border-[1px] border-solid border-[#C8E2F4] px-[10px] py-[6px]'>
          <Text type='body-14-medium' color='primary-2'>
            #MacroEconomy
          </Text>
        </div>
        <div className='inline-block rounded-[100px] border-[1px] border-solid border-[#C8E2F4] px-[10px] py-[6px]'>
          <Text type='body-14-medium' color='primary-2'>
            #MacroEconomy
          </Text>
        </div>
      </div>
    </>
  );
};
export default Trending;
