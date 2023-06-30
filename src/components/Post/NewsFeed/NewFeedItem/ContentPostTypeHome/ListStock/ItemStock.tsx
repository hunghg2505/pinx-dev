import Text from '@components/UI/Text';

const ItemStock = ({ data }: { data: string }) => {
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.length === 3 || data?.[0] !== 'C' ? data : data?.slice(1, 4)
  }.png`;
  return (
    <>
      <div className='mr-[10px]'>
        <div className='flex h-[32px] flex-row items-center justify-between rounded-[1000px] border-[1px] border-solid border-[rgba(88,157,192,0.24)] bg-[#1F6EAC] px-[4px] backdrop-blur-[2px] backdrop-filter'>
          {url && (
            <div className='w-24px mr-[10px] flex h-[24px] flex-row items-center justify-center rounded-full bg-[#ffffff]'>
              <img
                src={url}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='h-[22px] w-[22px] rounded-full object-contain'
              />
            </div>
          )}

          <Text type='body-12-medium' color='neutral-9'>
            {data}
          </Text>
        </div>
      </div>
    </>
  );
};
export default ItemStock;
