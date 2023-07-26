import React from 'react';

import { useDebounceFn } from 'ahooks';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { useSearchPublic } from '@components/Explore/service';
import { TYPESEARCH } from '@components/Home/service';
import FormItem from '@components/UI/FormItem';
import { IconSearchWhite } from '@components/UI/Icon/IconSearchWhite';
import Input from '@components/UI/Input';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

import ItemAddStock from './ItemAddStock';

interface IProps {
  children: any;
  refreshYourWatchList?: () => void;
  dataStock?: any;
  yourWatchListStock?: any;
}

const ModalAddStock = (props: IProps) => {
  const { t } = useTranslation('watchlist');
  const { children, refreshYourWatchList, dataStock, yourWatchListStock } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState<boolean>(false);
  const onVisible = () => {
    setVisible(!visible);
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
  console.log('ModalAddStock dataStock',dataStock);
  console.log('ModalAddStock listStock',listStock);

  const checkHeart = (code: any) => {
    const found = yourWatchListStock.find((element: any) => element?.stockCode === code?.stockCode);
    if (found){
      return true;
    }
    return false;
  };

  return (
    <>
      <div
        className='flex min-h-[68px] cursor-pointer items-center justify-center gap-x-[12px] rounded-[12px] border-[1px] border-dashed border-[#B1D5F1] hover:border-[#1F6EAC]'
        onClick={onVisible}
      >
        {children}
      </div>
      <Modal className='popupAddNewStock' visible={visible} onClose={onVisible} closable={false}>
        <div className='flex flex-col gap-y-[20px]'>
          <div></div>
          <div>
            <Form form={form} onValuesChange={run}>
              <FormItem name='search'>
                <Input
                  className='h-[44px] w-full rounded-[8px] bg-[#EFF2F5] pl-[36px] pr-[12px] outline-none'
                  placeholder={t('search.input')}
                  icon={<IconSearchWhite />}
                />
              </FormItem>
            </Form>
          </div>
          {listStock?.length < 1 ? (
            <div className='flex flex-col items-center gap-y-[8px] rounded-[12px] bg-[#F7F6F8] px-[28px] py-[20px]'>
              <Text type='body-20-semibold' className='text-[#0D0D0D]'>
                {t('search.emptyTitle')}
              </Text>
              <Text type='body-14-regular' className='text-[#999]'>
                {t('search.emptyDesc')}
              </Text>
            </div>
          ) : (
            <div className='flex h-[300px] flex-col gap-y-[16px] overflow-y-auto overflow-x-hidden pr-[10px]'>
              {listStock?.map((item: any, index: number) => (
                <>
                  <ItemAddStock
                    key={index}
                    refreshYourWatchList={refreshYourWatchList}
                    data={item}
                    like={checkHeart(item)}
                  />
                </>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
export default ModalAddStock;
