import classNames from 'classnames';
import { toast } from 'react-hot-toast';

import { useSelectStock } from '@components/Auth/Register/CompanyStep/service';
import Loading from '@components/UI/Loading';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { imageStock } from '@utils/common';

import styles from './index.module.scss';

const ItemAddStock = ({ data, refreshYourWatchList, like }: { data: any, refreshYourWatchList?: () => void, like?: boolean }) => {
  const requestSelectStock = useSelectStock({
    onSuccess: () => {
      toast(() => <Notification type='success' message='Add stock success' />);
      refreshYourWatchList && refreshYourWatchList();
    },
  });
  const onAddStock = () => {
    requestSelectStock.run(data?.stockCode);
  };
  console.log(like);
  return (
    <>
      <div className='flex items-center gap-x-[10px]'>
        <img
          src={imageStock(data?.stockCode)}
          alt=''
          className='h-[36px] w-[36px] rounded-full object-contain tablet:h-[48px] tablet:w-[48px] bg-white'
        />
        <div className='flex flex-col gap-y-[4px]'>
          <div className='flex gap-x-[4px]'>
            <Text type='body-16-semibold' className='text-[#0D0D0D]'>
              {data?.stockCode}
            </Text>
            <Text
              type='body-10-regular'
              className='text-#394251 rounded-[4px] border-[1px] border-solid border-[#EBEBEB] bg-[#fff] px-[7px] py-[2px] leading-[16px]'
            >
              {data?.stockExchange}
            </Text>
          </div>
          <Text type='body-12-regular' className='max-w-[155px] text-[#474D57]'>
            {data?.name}
          </Text>
        </div>
      </div>
      {requestSelectStock?.loading ? (
        <Loading />
      ) : (
        <div className='flex pr-[12px]' onClick={onAddStock}>
          <div
            className={classNames(
              'absolute -right-3 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#fff]',
              styles.heart,
            )}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM8.41613 12.4677L11.9839 8.78387C13.0226 7.7129 12.9613 5.93871 11.8065 4.95161C10.7968 4.09032 9.29355 4.24516 8.36774 5.2L8.00323 5.57419L7.63871 5.2C6.7129 4.24516 5.20968 4.09032 4.2 4.95161C3.04194 5.93871 2.98065 7.7129 4.01613 8.78387L7.58065 12.4677C7.8129 12.7065 8.1871 12.7065 8.41613 12.4677Z'
                fill='black'
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};
export default ItemAddStock;
