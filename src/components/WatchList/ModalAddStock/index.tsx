import React from 'react';

import { useDebounceFn } from 'ahooks';
import { useTranslation } from 'next-i18next';
import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import { useSearchPublic } from '@components/Explore/service';
import { TYPESEARCH } from '@components/Home/service';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';
// import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { IconSearchWhite } from '@layout/components/MainHeader';

import ItemAddStock from './ItemAddStock';

interface IProps {
  children: any;
}

const ModalAddStock = (props: IProps) => {
  const { t } = useTranslation('watchlist');
  const { children } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState<boolean>(false);
  const onVisible = () => {
    setVisible(!visible);
  };
  const renderCloseIcon = (): React.ReactNode => {
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
  const { search, data } = useSearchPublic();
  const { run } = useDebounceFn(
    () => {
      const value = form.getFieldValue('search');
      search({
        keyword: value,
        searchType: TYPESEARCH.STOCK,
      });
    },
    {
      wait: 300,
    },
  );
  const listStock = data?.data?.companies || [];

  return (
    <>
      <div
        className='flex min-h-[68px] cursor-pointer items-center justify-center gap-x-[12px] rounded-[12px] border-[1px] border-dashed border-[#B1D5F1] hover:border-[#1F6EAC]'
        onClick={onVisible}>{children}</div>
      <Dialog className='popupAddNewStock' visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()} closable={false}>
        <div className='flex flex-col gap-y-[20px]'>
          <div></div>
          <div>
            <Form form={form} onValuesChange={run}>
              <FormItem name='search'>
                <Input
                  className='h-[44px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
                  placeholder={ t('search.input') }
                  icon={<IconSearchWhite />}
                />
              </FormItem>
            </Form>
          </div>
          {listStock?.length < 1 ? (
            <div className='flex flex-col items-center gap-y-[8px] rounded-[12px] bg-[#F7F6F8] px-[28px] py-[20px]'>
              <Text type='body-20-semibold' className='text-[#0D0D0D]'>
                { t('search.emptyTitle') }
              </Text>
              <Text type='body-14-regular' className='text-[#999]'>
                { t('search.emptyDesc') }
              </Text>
            </div>
          ) : (
            <div className='flex h-[300px] flex-col gap-y-[16px] overflow-y-auto overflow-x-hidden pr-[10px]'>
              {listStock?.map((item: any, index: number) => (
                <div
                  key={index}
                  className='relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]'
                >
                  <ItemAddStock data={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};
export default ModalAddStock;
