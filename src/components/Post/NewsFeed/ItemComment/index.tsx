import Image from 'next/image';

const ItemComment = () => {
  return (
    <div>
      <div className='flex flex-row items-center justify-between'>
        <div className='avatar flex items-center'>
          <Image
            src='/static/icons/avatar.svg'
            alt=''
            width={24}
            height={24}
            className='mr-[10px] w-[24px]'
          />
          <div>Jessica Simpson</div>
        </div>
        <div className='time'>31m ago</div>
      </div>
      <div className='ml-[34px] mt-1'>
        <p className='rounded-[16px] bg-[#F8F8F8] p-3 '>
          Per conubia nostra, per inceptos no more himenaeos
        </p>
        <div className='action mt-[15px] flex cursor-pointer flex-row items-center justify-between'>
          <div className='like flex flex-row items-center justify-center'>
            <Image
              src='/static/icons/iconLike.svg'
              alt=''
              width={17.5}
              height={15.5}
              className='mr-[10px]'
            />
          </div>
          <div className='comment flex cursor-pointer flex-row items-center justify-center'>
            <Image
              src='/static/icons/iconComment.svg'
              alt=''
              width={14}
              height={14}
              className='mr-[9px] w-[14px]'
            />
            <p>Replie</p>
          </div>
          <div className='report flex cursor-pointer flex-row items-center justify-center'>
            <Image
              src='/static/icons/iconReport.svg'
              alt=''
              width={13}
              height={14}
              className='mr-[10px] w-[13px]'
            />
            <p>Repost</p>
          </div>
        </div>
        <div className='sub-comment'>
          <div className='flex flex-row items-center justify-between'>
            <div className='avatar flex items-center'>
              <Image
                src='/static/icons/avatar.svg'
                alt=''
                width={24}
                height={24}
                className='mr-[10px] w-[24px]'
              />
              <div>Jessica Simpson</div>
            </div>
            <div className='time'>31m ago</div>
          </div>
          <div className='ml-[34px] mt-1'>
            <p className='rounded-[16px] bg-[#F8F8F8] p-3 '>
              Per conubia nostra, per inceptos no more himenaeos
            </p>
            <div className='action mt-[15px] flex cursor-pointer flex-row items-center justify-between'>
              <div className='like flex flex-row items-center justify-center'>
                <Image
                  src='/static/icons/iconLike.svg'
                  alt=''
                  width={17.5}
                  height={15.5}
                  className='mr-[10px]'
                />
              </div>
              <div className='comment flex cursor-pointer flex-row items-center justify-center'>
                <Image
                  src='/static/icons/iconComment.svg'
                  alt=''
                  width={14}
                  height={14}
                  className='mr-[9px] w-[14px]'
                />
                <p>Replie</p>
              </div>
              <div className='report flex cursor-pointer flex-row items-center justify-center'>
                <Image
                  src='/static/icons/iconReport.svg'
                  alt=''
                  width={13}
                  height={14}
                  className='mr-[10px] w-[13px]'
                />
                <p>Repost</p>
              </div>
            </div>
            <div className='sub-comment'>
              <div className='flex flex-row items-center justify-between'>
                <div className='avatar flex items-center'>
                  <Image
                    src='/static/icons/avatar.svg'
                    alt=''
                    width={24}
                    height={24}
                    className='mr-[10px] w-[24px]'
                  />
                  <div>Jessica Simpson</div>
                </div>
                <div className='time'>31m ago</div>
              </div>
              <div className='ml-[34px] mt-1'>
                <p className='rounded-[16px] bg-[#F8F8F8] p-3 '>
                  Per conubia nostra, per inceptos no more himenaeos
                </p>
                <div className='action mt-[15px] flex cursor-pointer flex-row items-center justify-between'>
                  <div className='like flex flex-row items-center justify-center'>
                    <Image
                      src='/static/icons/iconLike.svg'
                      alt=''
                      width={17.5}
                      height={15.5}
                      className='mr-[10px]'
                    />
                  </div>
                  <div className='comment flex cursor-pointer flex-row items-center justify-center'>
                    <Image
                      src='/static/icons/iconComment.svg'
                      alt=''
                      width={14}
                      height={14}
                      className='mr-[9px] w-[14px]'
                    />
                    <p>Replie</p>
                  </div>
                  <div className='report flex cursor-pointer flex-row items-center justify-center'>
                    <Image
                      src='/static/icons/iconReport.svg'
                      alt=''
                      width={13}
                      height={14}
                      className='mr-[10px] w-[13px]'
                    />
                    <p>Repost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemComment;
