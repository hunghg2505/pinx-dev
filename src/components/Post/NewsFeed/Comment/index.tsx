import Image from 'next/image';

const mockData = [
  {
    id: 1,
    name: 'Nguyen Van A',
    avatar: 'https://avatars.dicebear.com/api/croodles/stefan.svg',
    create_at: '31m ago',
    content: 'day la content',
    reply: [
      {
        id: 12,
        name: 'Nguyen Van B',
        avatar: 'https://avatars.dicebear.com/api/croodles/stefan.svg',
        create_at: '31m ago',
        content: 'ban ten la gi',
        reply: [],
      },
      {
        id: 13,
        name: 'Nguyen Van C',
        avatar: 'https://avatars.dicebear.com/api/croodles/stefan.svg',
        create_at: '31m ago',
        content: 'hom nay troi dep',
        reply: [
          {
            id: 131,
            name: 'Nguyen Van C',
            avatar: 'https://avatars.dicebear.com/api/croodles/stefan.svg',
            create_at: '31m ago',
            content: 'thoi tiet hom nay khong dep',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Nguyen Nam B',
    avatar: 'https://avatars.dicebear.com/api/croodles/stefan.svg',
    create_at: '31m ago',
    content: 'toi la B',
  },
];
const Comment = () => {
  return (
    <div className='listComment'>
      {mockData?.map((item, index) => {
        return (
          <div key={index}>
            <div className='flex flex-row items-center justify-between'>
              <div className='avatar flex items-center'>
                <Image
                  src={item.avatar}
                  alt=''
                  width={24}
                  height={24}
                  className='mr-[10px] w-[24px]'
                />
                <div>{item.name}</div>
              </div>
              <div className='time'>{item.create_at}</div>
            </div>
            <div className='ml-[34px] mt-1'>
              <p className='rounded-[16px] bg-[#F8F8F8] p-3 '>{item.content}</p>
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
              {/* {item.reply ? } */}
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
      })}
    </div>
  );
};
export default Comment;
