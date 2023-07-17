import React from 'react';

import classNames from 'classnames';

export interface ITabBar {
  list: { key: string; props: { tab: string } }[];
  onChange: (key: string) => void;
  activeKey: string;
}
const TabBar = ({ list, onChange, activeKey }: ITabBar) => {
  return (
    <div role='tablist' className='rc-tabs-nav'>
      <div className='rc-tabs-nav-wrap mb-[20px]'>
        <div className='rc-tabs-nav-list duration-300 ease-in-out'>
          {list.map((item) => {
            return (
              <div
                className='rc-tabs-tab flex-auto text-center '
                key={item.key}
                onClick={() => {
                  onChange(item.key);
                }}
              >
                <div
                  role='tab'
                  className={classNames(
                    'rc-tabs-tab   duration-300 ease-in-out',
                    {
                      'rc-tabs-tab-active stroke-primary_blue font-[700] text-primary_blue':
                        activeKey === item.key,
                    },
                    { 'stroke-dark_grey text-dark_grey': activeKey !== item.key },
                  )}
                >
                  {item.props.tab}
                </div>
              </div>
            );
          })}
        </div>
        <div className='rc-tabs-nav-operations rc-tabs-nav-operations-hidden'></div>
      </div>
    </div>
  );
};
export default TabBar;
