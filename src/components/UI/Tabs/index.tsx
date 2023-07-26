import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';
import TabItem from './TabItem';

export enum TabsEnum {
  Profit = 'Profit',
  Revenue = 'Revenue',
  MarketCapitalization = 'MarketCapitalization',
  Price = 'Price',
  ChangeInPrice1Y = 'ChangeInPrice1Y',
}
export enum TabstopMentionEnum {
  TopWatching = 'TopWatching',
  TopMention = 'TopMention',
}

interface Props {
  onChange: (tabs: any) => void;
  defaultTab: any;
  currentTab?: any;
  contenTab: TabItem[];
}
interface TabItem {
  icon?: React.ReactNode;
  label: string;
  value: any;
}

interface Ref {
  ref?: React.Ref<any>;
}

const Tabs: React.FC<Props & Ref> = React.forwardRef((props: Props, ref: Ref['ref']) => {
  const refScroll: any = React.useRef(null);
  const { onChange, defaultTab, contenTab, currentTab } = props;

  const [activeTab, setActiveTab] = React.useState<any>(currentTab || defaultTab);

  // const leftToScroll = () => {
  //   let left = 0;
  //   switch (activeTab) {
  //     case TabsEnum.Profit:
  //     case TabsEnum.Revenue: {
  //       left = 0;
  //       break;
  //     }
  //     case TabsEnum.MarketCapitalization: {
  //       left = 216;
  //       break;
  //     }
  //     case TabsEnum.Price:
  //     case TabsEnum.ChangeInPrice1Y: {
  //       left = 478;
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  //   return left;
  // };
  // React.useEffect(() => {
  //   refScroll.current.scrollLeft = leftToScroll();
  // });

  const onChangeTab = (newTab: any) => {
    setActiveTab(newTab);
    onChange(newTab);

    const itemActive = refScroll.current?.querySelector(`.tab-20-${newTab}`);
    console.log({ itemActive });

    if (itemActive) {
      itemActive.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  React.useImperativeHandle(ref, () => {
    return { setActiveTab: (data: any) => setActiveTab(data) };
  });

  return (
    <div className={styles.tabs} ref={refScroll}>
      <div
        className={classNames(
          'flex flex-row items-center pb-[10px] [border-bottom:1px_solid_#EEF5F9]',
        )}
      >
        {contenTab?.map((tab: TabItem, index: number) => {
          const isActive: boolean = activeTab === tab.value;
          return (
            <TabItem {...tab} key={`tab-${index}`} onChangeTab={onChangeTab} isActive={isActive} />
          );
        })}
      </div>
    </div>
  );
});

export default Tabs;
