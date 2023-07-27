import React from 'react';

import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { isValidURL } from '@utils/common';

interface IProps {
  children: any;
  getDataOG: (value: any) => void;
  urlLinkInitial?: string;
}

const getMetaData = async (url: string) => {
  try {
    const response: any = await fetch(`/api/seo-url?url=${url}`.trim()).then((r) => r.json());

    return response?.meta;
  } catch {}
};

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
            <FormItem
              name='search'
              rules={[
                () => ({
                  validator(_: any, value: any) {
                    if (value && isValidURL(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('not_link')));
                  },
                }),
              ]}
            >
              <textarea
                placeholder={`${t('input_link')}...`}
                className='h-[100px] w-full outline-none'
              />
            </FormItem>
          </Form>
          <div className='my-[10px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div className='flex items-center'>
            <Text
              type='body-16-semibold'
              color='neutral-black'
              className='w-2/4 cursor-pointer [border-right:1px_solid_#EBEBEB]'
              onClick={onVisible}
            >
              {t('cancel')}
            </Text>
            <Text
              type='body-16-semibold'
              color='primary-2'
              className='w-2/4 cursor-pointer'
              onClick={form.submit}
            >
              {t('save')}
            </Text>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalLink;
