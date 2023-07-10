import Text from '@components/UI/Text';

const ThemeExploreItem = () => {
  return (
    <div className='relative flex h-[214px] flex-col justify-end rounded-[12px] bg-[#ffffff] '>
      <img
        src='/static/icons/explore/theme.svg'
        alt=''
        className='absolute left-[12px] top-[12px] z-10 h-[18px] w-[18px]'
      />
      <img
        src='/static/icons/explore/contentThumb.jpg'
        alt=''
        className='absolute left-0 top-0 h-full w-full rounded-[12px]'
      />
      <div className='absolute bottom-0 left-0 h-full w-full rounded-bl-[12px] rounded-br-[12px] rounded-tl-none rounded-tr-none bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0%,_rgba(0,_0,_0,_0)_61.25%,_rgba(0,_0,_0,_0.8)_100%)]'></div>
      <div className='relative z-10 p-[12px]'>
        <Text type='body-14-bold' color='neutral-9' className='mb-[6px]'>
          Industrial park technology
        </Text>
        <div className='flex items-center'>
          <div className='listAvatar mr-[7px] flex items-center'>
            <img
              src='/static/icons/explore/avatar.png'
              alt=''
              className='h-[20px] w-[20px] rounded-full'
            />
            <img
              src='/static/icons/explore/avatar.png'
              alt=''
              className='-ml-[10px] h-[20px] w-[20px] rounded-full'
            />
            <img
              src='/static/icons/explore/avatar.png'
              alt=''
              className='-ml-[10px] h-[20px] w-[20px] rounded-full'
            />
          </div>
          <Text type='body-12-medium' color='neutral-9'>
            3000+
          </Text>
        </div>
      </div>
    </div>
  );
};
export default ThemeExploreItem;
