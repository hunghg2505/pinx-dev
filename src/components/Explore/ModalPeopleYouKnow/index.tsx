import React from 'react';

import { useInfiniteScroll } from 'ahooks';
import Dialog from 'rc-dialog';

import { ISuggestionPeople } from '@components/Home/service';
import { useSuggestPeopleTheme } from '@components/Themes/service';
import Text from '@components/UI/Text';

import PeopleItem from './PeopleItem';

interface Iprops {
  children: any;
  closeIcon?: boolean;
}

const ModalPeopleYouKnow = (props: Iprops) => {
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const { children, closeIcon } = props;
  const { onLoadmorePeople } = useSuggestPeopleTheme();
  const { data, reload } = useInfiniteScroll<any>(
    async (d: any) => {
      return onLoadmorePeople(d);
    },
    {
      target: refScroll,
      isNoMore: (d) => !d?.nextId,
    },
  );
  React.useEffect(() => {
    if (visible) {
      reload();
    }
  }, [visible]);

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

  return (
    <>
      <div onClick={onVisible} className='cursor-pointer'>
        {children}
      </div>
      <Dialog
        visible={visible}
        onClose={onVisible}
        closeIcon={renderCloseIcon()}
        className='peopleYouKnow'
      >
        <div className='pt-[21px] text-center'>
          <Text type='body-20-semibold' color='neutral-1' className='mb-[8px]'>
            People you may know
          </Text>
          <Text type='body-14-regular' color='primary-5'>
            People on PineX that you may know!
          </Text>
          <div
            className='mt-[16px] flex h-[500px] flex-col gap-y-[16px] overflow-auto'
            ref={refScroll}
          >
            {data?.list?.map((people: ISuggestionPeople, index: number) => {
              return <PeopleItem key={index} data={people} />;
            })}
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalPeopleYouKnow;
