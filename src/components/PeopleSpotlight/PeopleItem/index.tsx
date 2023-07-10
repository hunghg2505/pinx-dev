import Text from '@components/UI/Text';

const IconUserUnFollow = () => (
  <svg width='20' height='20' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M19.5 10V4M16.5 7H22.5M16.5 21V19.8C16.5 18.1198 16.5 17.2798 16.173 16.638C15.8854 16.0735 15.4265 15.6146 14.862 15.327C14.2202 15 13.3802 15 11.7 15H7.3C5.61984 15 4.77976 15 4.13803 15.327C3.57354 15.6146 3.1146 16.0735 2.82698 16.638C2.5 17.2798 2.5 18.1198 2.5 19.8V21M13 7.5C13 9.433 11.433 11 9.5 11C7.567 11 6 9.433 6 7.5C6 5.567 7.567 4 9.5 4C11.433 4 13 5.567 13 7.5Z'
      stroke='#ffffff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const PeopleItem = () => {
  return (
    <div className='relative mb-[16px] flex h-[502px] w-full flex-col justify-end rounded-[12px] bg-[#ffffff]  [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
      <img
        src='/static/images/influencer.jpg'
        alt=''
        className='absolute left-0 top-0 h-full w-full rounded-[12px]'
      />
      <div className='absolute bottom-0 left-0 h-full w-full rounded-[12px] bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.87)_100%)]'></div>
      <div className='content relative z-10 p-[20px]'>
        <div className='name relative mb-[4px] w-max'>
          <Text type='body-24-semibold' color='neutral-9'>
            Lisa Simpson
          </Text>
          <img
            src='/static/icons/iconStarFollow.svg'
            alt=''
            className='absolute -right-[15px] -top-[5px] h-[16px] w-[16px]'
          />
        </div>
        <Text type='body-14-regular' color='neutral-9'>
          Entrepreneur, founder at ABC
        </Text>
        <Text
          type='body-12-regular'
          color='neutral-7'
          className='mt-[8px] py-[8px] [border-top:1px_solid_rgba(255,_255,_255,_0.25)]'
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum
          est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin
          lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet
          feugiat lectus.
        </Text>
        <div className='flex flex-row justify-between'>
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
          <div className='flex h-[32px] w-[98px] items-center justify-center rounded-[100px] bg-[#589DC0]'>
            <IconUserUnFollow />
            <Text type='body-12-semibold' color='neutral-9' className='ml-[8px]'>
              Follow
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PeopleItem;
