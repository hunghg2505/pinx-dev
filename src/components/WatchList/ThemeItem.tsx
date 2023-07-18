import { ITheme } from '@components/Home/service';
import Text from '@components/UI/Text';

const ThemeItem = ({ data }: { data: ITheme }) => {
  const latestSubscribe = data?.latestSubscribe;
  return (
    <div className='relative overflow-hidden rounded-[16px]'>
      <img
        src={data?.bgImage || data?.url}
        alt=''
        className='aspect-[331/467] object-cover desktop:aspect-[701/467]'
      />
      <div className='absolute inset-x-0 inset-y-0 flex flex-col justify-end gap-y-[8px] bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.00)_62.86%,_rgba(0,_0,_0,_0.80)_100%)] px-[12px] py-[16px] desktop:top-1/2 desktop:px-[24px]'>
        <Text type='body-20-semibold' color='cbwhite'>
          {data?.name}
        </Text>
        <Text color='cbwhite' className='text-[12px] desktop:text-[14px]'>
          {data?.description}
        </Text>
      </div>
      <div className='absolute left-0 right-0 top-0 flex items-start justify-between px-[20px] py-[20px]'>
        <img
          src='/static/icons/Lotus-white.svg'
          alt=''
          className='h-[24px] w-[24px] desktop:h-[32px] desktop:w-[32px]'
        />
        <div className='flex flex-col gap-y-[4px] text-right'>
          <div className='flex'>
            {latestSubscribe?.map((user: any, index: number) => {
              return (
                <img
                  key={index}
                  src={user?.avatar}
                  alt=''
                  className='mr-[-5px] h-[20px] w-[20px] rounded-full border-[1px] border-solid border-[_rgba(248,_250,_253,_0.20)] last:mr-0'
                />
              );
            })}
          </div>
          {data?.totalSubscribe > 3 && (
            <Text color='cbwhite' className='text-[12px] desktop:text-[14px]'>
              {data?.totalSubscribe - 3}+
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};
export default ThemeItem;
