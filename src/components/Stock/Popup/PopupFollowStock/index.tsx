/* eslint-disable quotes */
import React, { useEffect } from 'react';

import 'rc-dialog/assets/index.css';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import Dialog from 'rc-dialog';
import Form from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { useShareStockActivity } from '@components/Stock/service';
import { ShareStockAction } from '@components/Stock/type';
import { MainButton } from '@components/UI/Button';
import FormItem from '@components/UI/FormItem';
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
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { userLoginInfo } = useUserLoginInfo();

  const requestShareStockAct = useShareStockActivity({
    onSuccess: () => {
      toast(() => <Notification type='success' message='You have successfully shared' />);
      onClose();
      onRefreshStockActivities();
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      shareContent: `${userLoginInfo.displayName} has just ${
        isFollowedStock ? 'add' : 'deleted'
      } ${stockCode} from their following list`,
    });
  }, [isFollowedStock]);

  const onSubmit = ({ shareContent }: { shareContent: string }) => {
    requestShareStockAct.run({
      stockCode,
      message: shareContent,
      action: isFollowedStock ? ShareStockAction.ADD : ShareStockAction.REMOVE,
    });
  };

  const renderCloseIcon = () => {
    return (
      <img
        src='/static/icons/close_icon.svg'
        alt='Icon close'
        className='h-[21px] w-[21px] object-contain'
      />
    );
  };

  return (
    <Dialog
      visible={visible}
      onClose={onClose}
      closeIcon={renderCloseIcon()}
      className={styles.popupFollowStock}
    >
      <img
        src='/static/icons/speaker.svg'
        alt='Icon speaker'
        className='mx-auto mb-[4px] mt-[12px] h-[52px] w-[52px]'
      />
      <Text type='body-24-bold' className='text-center' color='semantic-2-1'>
        {isFollowedStock ? "I'm watching" : 'I unwatched'}
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
                {isFollowedStock ? 'Watching' : 'Unwatch'}
              </Text>

              <Text type='body-12-medium' color='neutral-darkgray' className='mt-[12px]'>
                {t('made_on_pinex')}
              </Text>
              <Text type='body-12-medium' color='neutral-darkgray' className='mt-[2px]'>
                {dayjs().format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>
        </div>

        <MainButton type='submit' className='mt-[20px] w-full'>
          {t('create_post')}
        </MainButton>
      </Form>
    </Dialog>
  );
};

export default PopupFollowStock;
