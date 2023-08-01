/* eslint-disable quotes */
import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { useShareStockActivity } from '@components/Stock/service';
import { ShareStockAction } from '@components/Stock/type';
import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
import Modal from '@components/UI/Modal/Modal';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { imageStock } from '@utils/common';

import styles from './index.module.scss';

interface IPopupFollowStockProps {
  visible: boolean;
  onClose: () => void;
  isFollowedStock: boolean;
  stockCode: string;
  background: string;
  onRefreshStockActivities: () => void;
}

const PopupFollowStock = ({
  visible,
  onClose,
  isFollowedStock,
  stockCode,
  background,
  onRefreshStockActivities,
}: IPopupFollowStockProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const [form] = Form.useForm();
  const { userLoginInfo } = useUserLoginInfo();

  const requestShareStockAct = useShareStockActivity({
    onSuccess: () => {
      toast(() => <Notification type='success' message={t('share_stock.message_success')} />);
      onClose();
      onRefreshStockActivities();
    },
    onError: (e: any) => {
      let error = e?.error;
      if (e?.errorCode && e.errorCode === 'error.activity.tooMany') {
        error = t('common:activity.tooMany.message');
      }
      toast(() => <Notification type='error' message={error} />);
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      shareContent: t('share_stock.content_post', {
        displayName: userLoginInfo.displayName,
        action: isFollowedStock ? t('share_stock.action_add') : t('share_stock.action_delete'),
        stockCode,
        from: isFollowedStock
          ? t('share_stock.action_add_from')
          : t('share_stock.action_delete_from'),
      }),
    });
  }, [isFollowedStock]);

  const onSubmit = ({ shareContent }: { shareContent: string }) => {
    requestShareStockAct.run({
      stockCode,
      message: shareContent,
      action: isFollowedStock ? ShareStockAction.ADD : ShareStockAction.REMOVE,
    });
  };

  return (
    <Modal visible={visible} onClose={onClose} className={styles.popupFollowStock}>
      <img
        src='/static/icons/speaker.svg'
        alt='Icon speaker'
        className='mx-auto mb-[4px] mt-[12px] h-[52px] w-[52px]'
      />
      <Text type='body-24-bold' className='text-center' color='semantic-2-1'>
        {isFollowedStock ? t('share_stock.i_am_watching') : t('share_stock.i_unwatched')}
      </Text>
      <Form form={form} className='mt-5' onFinish={onSubmit}>
        <FormItem
          name='shareContent'
          className='mb-[20px] flex h-[60px] flex-col items-start justify-start'
        >
          <textarea
            placeholder={t('what_do_you_want_to_comment')}
            className='h-full w-full resize-none text-[16px] outline-none'
          />
        </FormItem>

        <div className='relative flex h-[204px] w-full rounded-[8px]'>
          <img
            src={background}
            alt='Thumbnail'
            className='absolute left-0 top-0 h-full w-full rounded-lg object-cover'
          />

          <div className='absolute bottom-[8px] left-[20px] h-[168px] w-[120px] rounded-[8px] bg-[rgba(255,255,255,0.28)] text-center'>
            <img
              src={imageStock(stockCode)}
              alt='Stock logo'
              className='absolute left-1/2 h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white object-contain'
            />

            <div className='mt-[26px] flex flex-col items-center'>
              <Text type='body-16-bold' color='cbblack'>
                {stockCode}
              </Text>

              {isFollowedStock ? (
                <img
                  src='/static/icons/iconHeartActive.svg'
                  alt='Icon heart active'
                  className='mt-[4px] h-[24px] w-[24px] object-contain'
                />
              ) : (
                <img
                  src='/static/icons/iconHeart.svg'
                  alt='Icon heart'
                  className='mt-[4px] h-[24px] w-[24px] object-contain'
                />
              )}

              <Text type='body-12-medium' color='neutral-black' className='mt-[24px]'>
                {isFollowedStock ? t('share_stock.watching') : t('share_stock.unwatch')}
              </Text>

              <Text type='body-12-medium' color='neutral-darkgray' className='mt-[12px]'>
                {t('common:made_on_pinex')}
              </Text>
              <Text type='body-12-medium' color='neutral-darkgray' className='mt-[2px]'>
                {dayjs().format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>
        </div>

        <MainButton type='submit' className='mt-[20px] w-full'>
          {t('common:create_post')}
        </MainButton>
      </Form>
    </Modal>
  );
};

export default PopupFollowStock;
