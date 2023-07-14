import Text from '@components/UI/Text';

const Company = () => {
  return (
    <>
      <div className='flex items-center rounded-[15px] bg-[#F7F6F8] py-[10px] pl-[8px] pr-[20px]'>
        <img
          src='/static/logo/logoPintree.png'
          alt=''
          className='mr-[10px] h-[36px] w-[36px] rounded-full'
        />
        <div className='w-full'>
          <div className='flex items-center'>
            <Text type='body-16-semibold' color='neutral-1'>
              VNM
            </Text>
            <Text
              type='body-12-regular'
              className='ml-[4px] flex h-[20px] w-[57px]  items-center justify-center rounded-[4px] border-[1px] border-solid border-[#E6E6E6] bg-[#ffffff] text-[#808080]'
            >
              HOSE
            </Text>
          </div>
          <Text type='body-12-regular' className='line-clamp-2 max-w-[90%]' color='neutral-3'>
            Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP
          </Text>
        </div>
      </div>
    </>
  );
};
export default Company;
