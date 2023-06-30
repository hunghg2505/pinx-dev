/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import classNames from 'classnames';
import { atom } from 'jotai';
import Image from 'next/image';

import Text from '@components/UI/Text';

export const dataMention: any = atom([]);

export default forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectItem = (index: any) => {
    const item = props.items[index];
    if (item) {
      const isStock = !!item?.stockCode;
      if (isStock) {
        props.command({ id: item.id, label: item.stockCode });
      } else {
        props.command({ id: item.id, label: item.displayName });
      }
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: any }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className='fixed right-0 flex justify-center mobile:bottom-[60px] mobile:left-0 mobile:w-full tablet:w-[375px] desktop:w-[375px]'>
      <div className='w-[375px] bg-[#ffffff] p-[15px]'>
        <div className='items h flex max-h-[190px] w-full flex-col overflow-x-hidden overflow-y-scroll'>
          {props.items?.map((item: any, index: number) => {
            const isStock = !!item.stockCode;
            let url = '';
            const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
            if (isStock) {
              url = `${imageCompanyUrl}${
                item?.stockCode?.length === 3 || item?.stockCode[0] !== 'C'
                  ? item?.stockCode
                  : item?.stockCode?.slice(1, 4)
              }.png`;
            }

            return (
              <button
                // className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
                className={classNames('item h-30px mb-[12px] flex items-center')}
                key={index}
                onClick={() => selectItem(index)}
              >
                <Image
                  src={isStock ? url : item.avatar || '/static/logo/logoPintree.svg'}
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='mr-[12px] h-[36px] w-[36px] rounded-full object-contain'
                />
                <Text type='body-14-medium' color='cbblack'>
                  {isStock ? item.stockCode : item.displayName}
                </Text>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
