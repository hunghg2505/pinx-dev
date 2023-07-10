import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

interface Iprops {
  label: string;
  value: string;
}
const PinexTop = (props: Iprops) => {
  const { label, value } = props;
  const router = useRouter();
  const onHandleClick = () => {
    router.push({
      pathname: ROUTE_PATH.PINEX_TOP_20,
      query: { type: value },
    });
  };
  return (
    <div className='mr-[16px] cursor-pointer mobile-max:w-[149px]' onClick={onHandleClick}>
      <div className='relative flex h-[214px] flex-col justify-end rounded-[12px] bg-[#ffffff] '>
        <img
          src='/static/images/top20.jpg'
          alt=''
          className='absolute left-0 top-0 h-full w-full rounded-[12px]'
        />
        <div className='absolute bottom-0 left-0 h-full w-full rounded-bl-[12px] rounded-br-[12px] rounded-tl-none rounded-tr-none bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0%,_rgba(0,_0,_0,_0)_61.25%,_rgba(0,_0,_0,_0.8)_100%)]'></div>
        <div className='relative z-10 p-[12px]'>
          <Text type='body-14-semibold' color='neutral-9' className='mb-[6px]'>
            {label}
          </Text>
        </div>
      </div>
    </div>
  );
};
export default PinexTop;
