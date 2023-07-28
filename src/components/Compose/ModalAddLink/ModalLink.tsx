import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import { getMetaData } from '@components/Compose/ModalAddLink/service';
import FormItem from '@components/UI/FormItem';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { isValidURL } from '@utils/common';

interface IProps {
  children: any;
  getDataOG: (value: any) => void;
  urlLinkInitial?: string;
}

const ModalLink = (props: IProps) => {
  const { children, getDataOG, urlLinkInitial } = props;
  const { t } = useTranslation('common');
  const [visible, setVisible] = React.useState<boolean>(false);

  const onVisible = async () => {
    setVisible(!visible);
    const text = await navigator?.clipboard?.readText();
    if (text && text.includes('http')) {
      form.setFieldValue('search', text);
    }
  };

  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const data = await getMetaData(values?.search);

    setVisible(!visible);

    getDataOG(data);
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>

      <Modal visible={visible} onClose={onVisible} className='addLink'>
        <div className='text-center'>
          <Text type='body-20-semibold' color='neutral-1' className='mb-[8px]'>
            {t('add_link_to_post')}
          </Text>
          <div className='my-[10px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <Form form={form} onFinish={onSubmit} initialValues={{ search: urlLinkInitial }}>
            <FormItem name='search'>
              <textarea
                placeholder={`${t('input_link')}...`}
                className='h-[100px] w-full outline-none'
              />
            </FormItem>
            <div className='my-[10px] block h-[2px] w-full bg-[#EEF5F9]'></div>
            <div className='flex items-center justify-center gap-[30px]'>
              <Text
                type='body-16-semibold'
                color='neutral-black'
                className='cursor-pointer [border-right:1px_solid_#EBEBEB]'
                onClick={onVisible}
              >
                {t('cancel')}
              </Text>

              <FormItem dependencies={['search']}>
                {({ value }: any) => {
                  return (
                    <Text
                      type='body-16-semibold'
                      color='primary-2'
                      className={classNames(
                        'flex h-[38px] w-[93px] cursor-pointer items-center justify-center rounded-[1000px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)] text-white',
                        {
                          'opacity-50': !isValidURL(value?.search),
                          'pointer-events-none': !isValidURL(value?.search),
                        },
                      )}
                      onClick={form.submit}
                    >
                      {t('save')}
                    </Text>
                  );
                }}
              </FormItem>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalLink;
