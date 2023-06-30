import React from 'react';

import 'rc-dialog/assets/index.css';

import classNames from 'classnames';
import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';

import { useGetListFillter } from '../service';

interface IProps {
  closeIcon?: boolean;
  run: (value: string) => void;
}
export interface IFilter {
  title: string;
  description: string;
  filterType: string;
}
export enum FILTER_TYPE {
  MOST_RECENT = 'MOST_RECENT',
  MOST_REACTED = 'MOST_REACTED',
  POST = 'POST',
  NEWS = 'NEWS',
}
const ModalFilter = (props: IProps) => {
  const [filterType, setFilterType] = React.useState<string>(FILTER_TYPE.MOST_RECENT);
  const { data } = useGetListFillter();
  const { closeIcon, run } = props;
  const [visible, setVisible] = React.useState(false);
  const onVisible = () => {
    setVisible(!visible);
  };
  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return (
      <img
        src='/static/icons/iconClose.svg'
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='w-[13px]'
      />
    );
  };
  const onFilter = (value: string) => {
    run(value);
    setFilterType(value);
    onVisible();
  };
  const renderText = () => {
    const text = data?.data?.find((item: IFilter) => item.filterType === filterType);
    if (text) {
      return text.title;
    }
    // return text.title;
  };
  return (
    <>
      <span
        onClick={onVisible}
        className='flex min-w-[89px] cursor-pointer items-center justify-center rounded-[4px] border-[1px] border-solid border-[#B1D5F1] bg-[#F0F7FC] [box-shadow:0px_1px_2px_rgba(0,_0,_0,_0.06)] mobile:h-[34px] mobile:px-[5px] desktop:h-[38px] desktop:px-[14px]'
      >
        <Text type='body-14-semibold' color='neutral-1' className='mr-[8px]'>
          {renderText()}
        </Text>
        <img
          src='/static/icons/iconDropDown.svg'
          alt=''
          width='0'
          height='0'
          className='w-[10px]'
        />
      </span>
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()}>
        <div className='absolute left-[20px] top-[20px] flex flex-row items-center'>
          <img
            src='/static/icons/iconFilter.svg'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='mr-[8px] w-[16px]'
          />
          <Text className=''>Filter posts by</Text>
        </div>
        <div className='list mt-[36px]'>
          {data &&
            data?.data?.map((item: IFilter, index: string) => {
              const isChecked: boolean = item.filterType === filterType;
              return (
                <div
                  className={classNames(
                    'mb-[12px] flex cursor-pointer items-center justify-between rounded-[8px] bg-[#F3F2F6] px-[16px] py-[12px]',
                    { '!bg-[#589DC0]': isChecked },
                  )}
                  key={index}
                  onClick={() => onFilter(item.filterType)}
                >
                  <div>
                    <Text
                      type='body-14-semibold'
                      color='neutral-1'
                      className={classNames({ '!text-[#ffffff]': isChecked })}
                    >
                      {item.title}
                    </Text>
                    <Text
                      type='body-12-regular'
                      color='neutral-1'
                      className={classNames({ '!text-[#ffffff]': isChecked })}
                    >
                      {item.description}
                    </Text>
                  </div>
                  {isChecked && (
                    <img
                      src='/static/icons/iconCheckedFilter.svg'
                      alt=''
                      width='0'
                      height='0'
                      className='w-[21px]'
                    />
                  )}
                </div>
              );
            })}
        </div>
      </Dialog>
    </>
  );
};
export default ModalFilter;
