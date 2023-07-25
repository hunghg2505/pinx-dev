import React from 'react';

import classNames from 'classnames';

export interface ITabBar {
  list: { key: string; props: { tab: string } }[];
  onChange: (key: string) => void;
  activeKey: string;
}
const TabBar = ({ list, onChange, activeKey }: ITabBar) => {
  return (
    <div role='tablist' className='rc-tabs-nav z-10 mb-[20px]'>
      <div className=' border-b-[1px] border-solid border-primary_blue_light'>
        <div className='rc-tabs-nav-list  ml-[-16px] duration-300 ease-in-out tablet:mx-0 whitespace-nowrap'>
          {list.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => {
                  onChange(item.key);
                }}
                role='tab'
                className={classNames(
                  'rc-tabs-tab  flex-1 border-b-[3px] border-solid border-[transparent] text-center text-[16px] duration-300 ease-in-out tablet:flex-grow-0',
                  {
                    'rc-tabs-tab-active stroke-[#000] font-[600] text-[#000]':
                      activeKey === item.key,
                  },
                  { 'stroke-dark_grey  text-dark_grey': activeKey !== item.key },
                )}
              >
                {item?.props?.tab}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default TabBar;
