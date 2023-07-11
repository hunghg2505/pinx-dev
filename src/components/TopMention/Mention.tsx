import WatchingStock from '@components/Explore/WatchingStock';
import Text from '@components/UI/Text';

const Mention = () => {
  return (
    <>
      <Text type='body-14-regular' color='cbblack' className='mb-[16px]'>
        Top most mentioned stocks on PineX
      </Text>
      <div className='flex flex-col gap-y-[12px]'>
        <WatchingStock percen={50} />
        <WatchingStock percen={50} />
        <WatchingStock percen={50} />
        <WatchingStock percen={50} />
      </div>
    </>
  );
};
export default Mention;
