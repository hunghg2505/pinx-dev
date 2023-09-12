import Image from 'next/image';

const PeopleDetail = () => {
  return (
    <>
      <div>
        <Image
          width='0'
          height='0'
          sizes='100vw'
          loading='lazy'
          src='/static/images/bg_influencer.jpg'
          alt=''
          className='h-[154px] w-full'
        />
      </div>
    </>
  );
};
export default PeopleDetail;
