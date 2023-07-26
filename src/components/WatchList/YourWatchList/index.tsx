import React from 'react';

import classNames from 'classnames';

import { IWatchListItem } from '@components/Home/service';
import ItemWatchList from '@components/WatchList/YourWatchList/ItemWatchList';

interface IProps {
  watchlistId?: number,
  dataStock?: any,
  isEdit?: boolean;
  yourWatchListStock?: any;
  loadingYourWatchList?: boolean;
  setDataStock?: any;
  setIsSave?: any;
  itemDelete?: any;
  setItemDelete?: any;
}
const YourWatchList = (props: IProps) => {
  const {
    dataStock,
    isEdit = false,
    yourWatchListStock,
    setDataStock,
    setIsSave,
    itemDelete,
    setItemDelete,
  } = props;
  React.useEffect(() => {
    setDataStock(yourWatchListStock);
  }, [isEdit]);
  return (
    <>
      <div className='flex flex-col gap-y-[16px]'>
        {isEdit ? (
          <>
            {dataStock?.map((item: IWatchListItem, index: number) => (
              <div
                key={index}
                className={classNames({
                  'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
                  isEdit,
                  'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] ':
                    !isEdit,
                })}
              >
                <ItemWatchList
                  data={item}
                  dataStock={dataStock}
                  setDataStock={setDataStock}
                  isEdit={isEdit}
                  setIsSave={setIsSave}
                  itemDelete={itemDelete}
                  setItemDelete={setItemDelete}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {yourWatchListStock?.map((item: IWatchListItem, index: number) => (
              <div
                key={index}
                className={classNames({
                  'relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]':
                  isEdit,
                  'flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px] ':
                    !isEdit,
                })}
              >
                <ItemWatchList
                  data={item}
                  dataStock={dataStock}
                  setDataStock={setDataStock}
                  isEdit={isEdit}
                  setIsSave={setIsSave}
                  itemDelete={itemDelete}
                  setItemDelete={setItemDelete}
                />
              </div>
            ))}
          </>
        )}

      </div>
    </>
  );
};
export default YourWatchList;
