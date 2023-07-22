import classNames from 'classnames';
import { useRouter } from 'next/router';

import { ILatestSubscribe, ITheme } from '@components/Home/service';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

interface IProps {
  data: ITheme;
}
const ThemeExploreItem = (props: IProps) => {
  const { data } = props;
  const router = useRouter();
  const code = data?.code;
  const isLogin = !!getAccessToken();
  const onGotoDetail = () => {
    router.push(ROUTE_PATH.THEME_DETAIL(code));
  };
  return (
    <div
      className='relative flex h-[214px] cursor-pointer flex-col justify-end rounded-[12px] bg-[#ffffff] mobile-max:h-[237px]'
      onClick={onGotoDetail}
    >
      <img
        src='/static/icons/explore/theme.svg'
        alt=''
        className='absolute left-[12px] top-[12px] z-10 h-[18px] w-[18px]'
      />
      <img src={data?.url} alt='' className='absolute left-0 top-0 h-full w-full rounded-[12px]' />
      <div className='absolute bottom-0 left-0 h-full w-full rounded-bl-[12px] rounded-br-[12px] rounded-tl-none rounded-tr-none bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0%,_rgba(0,_0,_0,_0)_61.25%,_rgba(0,_0,_0,_0.8)_100%)]'></div>
      <div className='relative z-10 p-[12px]'>
        <Text type='body-14-bold' color='neutral-9' className='mb-[6px]'>
          {data?.name}
        </Text>
        {isLogin && (
          <div className='flex items-center'>
            <div className='listAvatar mr-[7px] flex items-center'>
              {data?.latestSubscribe?.map((item: ILatestSubscribe, index: number) => {
                return (
                  <img
                    src={item.avatar}
                    alt=''
                    className={classNames(' h-[20px] w-[20px] rounded-full', {
                      '-ml-[5px]': index > 0,
                    })}
                    key={index}
                  />
                );
              })}
            </div>
            <Text type='body-12-medium' color='neutral-9'>
              {data?.totalSubscribe > 3 ? `${data?.totalSubscribe - 3}+` : ''}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
export default ThemeExploreItem;
