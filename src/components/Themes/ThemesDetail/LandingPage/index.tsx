import Text from '@components/UI/Text';

const LandingPageDetailThemes = () => {
  return (
    <div className='rounded-b-[16px] bg-[#B5D2D3] pt-[16px]'>
      <div className='ml-[16px] flex h-[29px] w-[29px] content-center items-center justify-center rounded-full bg-[#000000] opacity-50'>
        <img
          src='/static/icons/icon_back_white.svg'
          alt=''
          width='0'
          height='0'
          className='h-[15px]cursor-pointer w-[9px]'
        />
      </div>
      <div>
        <img src='/static/images/imageDetailThemes.png' alt='' width='0' height='0' className='' />
      </div>
      <div className='mt-[-25px] rounded-b-[16px] rounded-br-[16px] bg-gradient-to-t from-[#000000] px-[16px] pb-[16px]'>
        <Text type='body-20-semibold' color='neutral-9' className='mb-[8px]'>
          Industrial park technology
        </Text>
        <Text type='body-14-regular' color='neutral-9' className='mb-[8px]'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
          est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
          lacus, ut interdum tellus elit sed risus.
        </Text>
        <div className='flex items-center justify-between'>
          <div className=''>
            <Text
              className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
              type='body-20-medium'
            >
              18
            </Text>
            <Text
              className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
              type='body-12-medium'
            >
              Symbols
            </Text>
          </div>
          <div>
            <Text
              className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
              type='body-20-medium'
            >
              18
            </Text>
            <Text
              className='bg-gradient-to-r from-[#8ADEF6] to-[#59C0E9] bg-clip-text text-transparent'
              type='body-12-medium'
            >
              Subscribed
            </Text>
          </div>
          <div className='flex items-center rounded-[1000px] bg-gradient-to-r from-[#589DC0] to-[#1D6CAB] px-[16px] py-[8px]'>
            <div className='mr-[8px]'>
              <img
                src='/static/icons/heartRing.svg'
                alt=''
                width='0'
                height='0'
                className='w-[18px] cursor-pointer'
              />
            </div>
            <Text type='body-14-medium' color='neutral-9'>
              Subscribe
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPageDetailThemes;
