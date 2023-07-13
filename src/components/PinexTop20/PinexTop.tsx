import classNames from 'classnames';

import Text from '@components/UI/Text';
import { imageStock } from '@utils/common';

interface Iprops {
  number: number;
  changePrice?: boolean;
  data: any;
}
const PinexTop = (props: Iprops) => {
  const { number, changePrice = false, data } = props;

  return (
    <div
      className={classNames(
        'flex items-center justify-between rounded-[15px] px-[16px] py-[10px]',
        {
          'bg-[#FCECC4]': number === 1,
          'bg-[#ECD1F0]': number === 2,
          'bg-[#D7EEFF]': number === 3,
          'bg-[#F7F6F8]': number > 3,
        },
      )}
    >
      <div className='flex items-center'>
        <div
          className={classNames(
            'mr-[16px] flex h-[24px] w-[24px] flex-row items-center justify-center rounded-full border-[1.5px] border-solid',
            {
              'border-[#E6A70A]': number === 1,
              'border-[#B349C3]': number === 2,
              'border-[#1F6EAC]': number === 3,
              'border-[#0D0D0D]': number > 3,
            },
          )}
        >
          <Text
            type='body-12-semibold'
            className={classNames('h-[15x]', {
              'text-[#E6A70A]': number === 1,
              'text-[#B349C3]': number === 2,
              'text-[#1F6EAC]': number === 3,
              'text-[#0D0D0D]': number > 3,
            })}
          >
            {number}
          </Text>
        </div>
        <img
          src={imageStock(data?.stockCode)}
          className='mr-[10px] h-[36px] w-[36px] rounded-full object-contain'
          alt=''
        />
        <div>
          <div className='flex'>
            <Text type='body-16-semibold' color='neutral-1' className='mr-[4px]'>
              {data?.stockCode}
            </Text>
            <div className='flex h-[20px] w-[57px] flex-row items-center justify-center rounded-[4px] border-[1px] border-solid border-[#E6E6E6] bg-[#FFF]'>
              <Text type='body-12-regular' color='neutral-4'>
                {data?.stockExchange}
              </Text>
            </div>
          </div>
          <Text
            type='body-12-regular'
            color='neutral-3'
            className='line-clamp-2 mobile-max:max-w-[120px]'
          >
            {data?.name}
          </Text>
        </div>
      </div>
      {changePrice ? (
        <div className='flex items-center'>
          <Text type='body-16-regular' color='semantic-2-1'>
            {new Intl.NumberFormat().format(data?.percentChange)}%
          </Text>
          <img
            src='/static/icons/explore/iconChange.svg'
            alt=''
            className='ml-[4px] h-[16px] w-[16px]'
          />
        </div>
      ) : (
        <Text type='body-16-regular' color='neutral-1'>
          {new Intl.NumberFormat().format(
            data?.profit || data?.revenue || data?.marketCapital || data?.price,
          )}
        </Text>
      )}
    </div>
  );
};
export default PinexTop;
