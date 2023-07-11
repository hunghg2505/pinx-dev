import React from 'react';

import { useRouter } from 'next/router';

import Tabs, { TabstopMentionEnum } from '@components/UI/Tabs';

import Mention from './Mention';
import Watching from './Watching';

const TopMention = () => {
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const [selectTab, setSelectTab] = React.useState<TabstopMentionEnum>(
    TabstopMentionEnum.TopWatching,
  );
  const onChangeTab = (value: TabstopMentionEnum) => {
    setSelectTab(value);
  };
  const optionTab = [
    {
      label: 'Top watching',
      value: TabstopMentionEnum.TopWatching,
    },
    {
      label: 'Top mention',
      value: TabstopMentionEnum.TopMention,
    },
  ];
  const renderContentTab = () => {
    switch (selectTab) {
      case TabstopMentionEnum.TopWatching: {
        return <Watching />;
      }
      case TabstopMentionEnum.TopMention: {
        return <Mention />;
      }
      default: {
        break;
      }
    }
  };
  return (
    <>
      <img
        src='/static/icons/back_icon.svg'
        alt=''
        className='mb-[16px] w-[28px] cursor-pointer'
        onClick={onGoBack}
      />
      <div className='mt-[24px]'>
        <Tabs
          onChange={onChangeTab}
          contenTab={optionTab}
          defaultTab={TabstopMentionEnum.TopWatching}
          currentTab={selectTab}
        />
        <div className='mt-[32px]'>{renderContentTab()}</div>
      </div>
    </>
  );
};
export default TopMention;
