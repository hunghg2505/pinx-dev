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
const IconUserFollow = () => (
  <svg width='20' height='20' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M16.5 21V19.8C16.5 18.1198 16.5 17.2798 16.173 16.638C15.8854 16.0735 15.4265 15.6146 14.862 15.327C14.2202 15 13.3802 15 11.7 15H7.3C5.61984 15 4.77976 15 4.13803 15.327C3.57354 15.6146 3.1146 16.0735 2.82698 16.638C2.5 17.2798 2.5 18.1198 2.5 19.8V21M16.5 6L18.5 8L22.5 4M13 7.5C13 9.433 11.433 11 9.5 11C7.567 11 6 9.433 6 7.5C6 5.567 7.567 4 9.5 4C11.433 4 13 5.567 13 7.5Z'
      stroke='#ffffff'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
interface Iprops {
  isFollow?: boolean;
}
const PeopleItem = (props: Iprops) => {
  const { isFollow } = props;
  return (
    <div className='flex items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px] py-[11px]'>
      <div className='flex items-center'>
        <img
          src='/static/logo/logoPintree.png'
          alt=''
          className='mr-[8px] h-[44px] w-[44px] rounded-full'
        />
        <Text type='body-14-semibold' className='text-[#474D57]'>
          Lisa Simpson
        </Text>
      </div>
      {isFollow ? (
        <div className='rounded-[100px] bg-[#CCC] px-[16px] py-[6px]'>
          <IconUserFollow />
        </div>
      ) : (
        <div className='rounded-[100px] bg-[#589DC0] px-[16px] py-[6px]'>
          <IconUserUnFollow />
        </div>
      )}
    </div>
  );
};
export default PeopleItem;
