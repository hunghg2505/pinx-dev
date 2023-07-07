import Text from '@components/UI/Text';

interface Iprops {
  percen: number;
}
const KeywordSearch = (props: Iprops) => {
  const { percen } = props;
  return (
    <div className='relative  rounded-[15px] bg-[#F7F6F8] px-[28px] py-[15px]'>
      <div
        className='absolute left-0 top-0 z-[2] h-full rounded-[15px] bg-[#D7EEFF]'
        style={{ width: `${percen}%` }}
      ></div>
      <div className='relative z-10 flex justify-between'>
        <div className='flex h-[26px] w-[57px] items-center justify-center rounded-[4px] border-[1px] border-solid border-[#808A9D] bg-[#EAF4FB]'>
          <img
            src='/static/icons/explore/search.svg'
            alt=''
            className='mr-[4px] h-[16px] w-[16px]'
          />
          <Text type='body-14-regular' color='neutral-1'>
            Vix
          </Text>
        </div>
        <div className='flex items-center'>
          <Text type='body-16-regular' color='neutral-1'>
            88
          </Text>
          <img src='/static/icons/explore/iconClick.svg' alt='' className='ml-[4px] w-[17px]' />
        </div>
      </div>
    </div>
  );
};
export default KeywordSearch;
