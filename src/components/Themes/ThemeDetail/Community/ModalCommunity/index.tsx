import React from 'react';

import { useRequest } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { IUserTheme, getCommunity } from '@components/Themes/service';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import useObserver from '@hooks/useObserver';

import ItemPeople from '../ItemPeople';

interface Iprops {
  children: any;
  closeIcon?: boolean;
  code: string;
}

const ModalCommunity = (props: Iprops) => {
  const { t } = useTranslation('theme');
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const { children, code } = props;
  const onVisible = () => {
    setVisible(!visible);
  };
  const { data, loading, mutate, runAsync } = useRequest(async (page: any, code: string) => {
    if (page === false) {
      return;
    }

    return getCommunity(page, code);
  });

  React.useEffect(() => {
    runAsync(1, code);
  }, [code]);
  const service = async () => {
    if (!data?.page || loading) {
      return;
    }
    const newData: any = await runAsync(data?.page, code);
    if (newData?.list?.length) {
      mutate({
        list: [...data?.list, ...newData?.list],
        page: newData?.page ? newData?.page + 1 : false,
        totalElements: newData?.totalElements,
      });
    }
  };
  const { refLastElement } = useObserver();
  return (
    <>
      <div onClick={onVisible}>{children}</div>
      <Modal visible={visible} onClose={onVisible}>
        <div className='w-full'>
          <Text type='body-20-semibold' color='primary-5' className='text-center'>
            {t('tab.community')}
          </Text>
          <div
            className='mt-[12px] h-[500px] w-full  overflow-y-auto overflow-x-hidden'
            ref={refScroll}
          >
            {/* {data?.list?.map((item: any) => {
              return (
                <div key={item.customerId} className='mb-[12px] w-full'>
                  <ItemPeople data={item} />
                </div>
              );
            })} */}
            {data?.list?.map((item: IUserTheme, idx: number) => {
              if (idx + 1 === data?.list?.length) {
                return (
                  <div
                    ref={(node) => refLastElement(node, service)}
                    key={`ModalCommunity-${item?.customerId}`}
                    className='mb-[12px] w-full'
                  >
                    <ItemPeople isModal key={item.customerId} data={item} />
                  </div>
                );
              }

              return (
                <div key={`ModalCommunity-${item?.customerId}`} className='mb-[12px] w-full'>
                  <ItemPeople isModal key={item.customerId} data={item} />
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalCommunity;
