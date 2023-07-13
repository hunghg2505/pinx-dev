import React from 'react';

import { useInfiniteScroll } from 'ahooks';
import Dialog from 'rc-dialog';

import { useGetCommunity } from '@components/Themes/service';
import Text from '@components/UI/Text';

import ItemPeople from '../ItemPeople';

interface Iprops {
  children: any;
  closeIcon?: boolean;
  code: string;
}

const ModalCommunity = (props: Iprops) => {
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const { children, closeIcon, code } = props;
  const onVisible = () => {
    setVisible(!visible);
  };
  React.useEffect(() => {
    if (visible) {
      reload();
    }
  }, [visible]);
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
        className='w-[21px]'
      />
    );
  };
  const { onLoadmoreCommunity } = useGetCommunity(code);
  const { data, reload } = useInfiniteScroll(
    (d: any) => {
      return onLoadmoreCommunity(d);
    },
    {
      target: refScroll,
      isNoMore: (d) => !d?.nextId,
    },
  );

  return (
    <>
      <div onClick={onVisible}>{children}</div>
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()}>
        <div className='w-full'>
          <Text type='body-20-semibold' color='primary-5' className='text-center'>
            Community
          </Text>
          <div
            className='mt-[12px] h-[500px] w-full  overflow-y-auto overflow-x-hidden'
            ref={refScroll}
          >
            {data?.list?.map((item: any) => {
              return (
                <div key={item.customerId} className='mb-[12px] w-full'>
                  <ItemPeople data={item} />
                </div>
              );
            })}
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalCommunity;
