import { forwardRef, useImperativeHandle, useState } from 'react';

import classNames from 'classnames';
import { useAtomValue } from 'jotai';

import Fade from '@components/UI/Fade';
import { postThemeAtom } from '@store/postTheme/theme';

export const ListTheme = forwardRef(({ onSelectThemeId, themeActiveId }: any, ref: any) => {
  const bgTheme = useAtomValue(postThemeAtom);
  const [isShowMore, setIsShowMore] = useState(true);

  useImperativeHandle(ref, () => {
    return {
      onHide: () => setIsShowMore(false),
    };
  });

  return (
    <div className='scrollbarStyle mt-[20px] w-[100%] '>
      <div className='flex gap-[10px]'>
        <div
          className='min-w-[38px] cursor-pointer rounded-[10px] bg-[#F7F6F8] p-[8px] [box-shadow:0px_2px_12px_0px_rgba(0,_0,_0,_0.07),_0px_0.5px_2px_0px_rgba(0,_0,_0,_0.12)]'
          onClick={() => setIsShowMore(!isShowMore)}
        >
          <img
            loading='lazy'
            src='/static/icons/explore/iconCompose.svg'
            alt=''
            className='h-[22px] w-[22px]'
          />
        </div>

        <Fade visible={isShowMore}>
          <div className={classNames('whitespace-nowrap text-left')}>
            <div
              className={classNames(
                'mr-[10px] inline-block h-[38px] w-[38px] cursor-pointer rounded-[10px]  bg-[#EBEBEB] [box-shadow:0px_2px_12px_0px_rgba(0,_0,_0,_0.07),_0px_0.5px_2px_0px_rgba(0,_0,_0,_0.12)]',
                { 'border-[2px] border-solid border-[#FFF]': themeActiveId === 'default' },
              )}
              onClick={onSelectThemeId('default')}
            ></div>

            {bgTheme?.map((item: any, index: number) => {
              return (
                <div
                  className={classNames(
                    'relative mr-[10px] inline-block h-[38px] w-[38px] cursor-pointer rounded-[10px] [box-shadow:0px_2px_12px_0px_rgba(0,_0,_0,_0.07),_0px_0.5px_2px_0px_rgba(0,_0,_0,_0.12)]',
                    { 'border-[2px] border-solid border-[#FFF]': item.id === themeActiveId },
                  )}
                  key={index}
                  onClick={onSelectThemeId(item.id)}
                >
                  <img
                    src={item.bgImage}
                    alt=''
                    className='absolute left-0 top-0 h-full w-full rounded-[10px]'
                  />
                </div>
              );
            })}
          </div>
        </Fade>
      </div>
    </div>
  );
});
