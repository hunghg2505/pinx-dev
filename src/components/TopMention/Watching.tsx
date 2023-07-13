import WatchingStock from '@components/Explore/WatchingStock';

const Watching = () => {
  return (
    <div className='flex flex-col gap-y-[12px]'>
      <WatchingStock percen={50} />
      <WatchingStock percen={50} />
      <WatchingStock percen={50} />
      <WatchingStock percen={50} />
    </div>
  );
};
export default Watching;
