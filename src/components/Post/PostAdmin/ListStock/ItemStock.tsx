import Image from 'next/image';

import Text from '@components/UI/Text';

const ItemStock = () => {
  return (
    <>
      <div className='mr-[10px]'>
        <div className='flex flex h-[32px] flex-row items-center items-center justify-between rounded-[1000px] border-[1px] border-solid border-[rgba(88,157,192,0.24)] bg-[rgba(31,_110,_172,_0.5)] px-[4px] backdrop-blur-[2px] backdrop-filter'>
          <Image
            src='/static/icons/logoStock.svg'
            alt=''
            width='0'
            height='0'
            className='w-[24px]'
          />
          <Text type='body-12-medium' color='neutral-9'>
            $HPG
          </Text>
        </div>
      </div>
    </>
  );
};
export default ItemStock;
