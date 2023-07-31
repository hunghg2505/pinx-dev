import React from 'react';

import { useInfiniteScroll } from 'ahooks';
import { useTranslation } from 'next-i18next';

import { ISuggestionPeople } from '@components/Home/service';
import { useSuggestPeopleTheme } from '@components/Themes/service';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

import styles from './index.module.scss';
import PeopleItem from './PeopleItem';

interface Iprops {
  children: any;
  closeIcon?: boolean;
  onClose?: () => void;
  refreshList?: () => void;
}

const ModalPeopleYouKnow = (props: Iprops) => {
  const { t } = useTranslation('common');
  const { onClose = () => {}, refreshList } = props;
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean>(false);
  const { children } = props;
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

  return (
    <>
      <div onClick={onVisible} className='cursor-pointer'>
        {children}
      </div>
      <Modal
        visible={visible}
        onClose={() => {
          onVisible();
          onClose();
        }}
        className='peopleYouKnow'
        wrapClassName={styles.dialog}
      >
        <div className='pt-[21px] text-left'>
          <Text type='body-20-semibold' color='neutral-1' className='mb-[8px]'>
            {t('people_you_may_know')}
          </Text>
          <Text type='body-14-regular' color='primary-5'>
            {t('people_you_may_know_note')}
          </Text>
          <div
            className='mt-[16px] flex h-[500px] flex-col gap-y-[16px] overflow-auto mobile-max:h-[350px]'
            ref={refScroll}
          >
            {data?.list?.map((people: ISuggestionPeople) => {
              return (
                <PeopleItem
                  key={`people-${people.id}`}
                  data={people}
                  reload={reload}
                  refreshList={refreshList}
                  onClosePopup={onVisible}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalPeopleYouKnow;
