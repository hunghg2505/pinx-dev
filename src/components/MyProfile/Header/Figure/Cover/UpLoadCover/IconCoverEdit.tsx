import Loading from '@components/UI/Loading';

const IconCoverEdit = ({ loading }: { loading: boolean }) => {
  return (
    <div className='absolute right-[16px] top-[16px] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/50 p-[7.85px]'>
      {loading ? (
        <Loading />
      ) : (
        <img
          src='/static/icons/editCover.svg'
          alt='Icon edit cover'
          className='h-[18px] w-[18px] object-cover'
        />
      )}
    </div>
  );
};
export default IconCoverEdit;
