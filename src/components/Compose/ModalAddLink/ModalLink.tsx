import React, { useEffect } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Form from 'rc-field-form';

import FormItem from '@components/UI/FormItem';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { getSeoDataFromLink, isValidURL } from '@utils/common';

import styles from './index.module.scss';

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
  };

  useEffect(() => {
    const init = async () => {
      if (visible) {
        const text = await navigator?.clipboard?.readText();
        const t = setTimeout(() => {
          if (text && text.includes('http')) {
            form.setFieldValue('search', text);
          }
          clearTimeout(t);
        }, 400);
      }
    };
    init();
  }, [visible]);

  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const data = await getSeoDataFromLink(values?.search.trim());

    setVisible(!visible);

    getDataOG(data);
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>

      <Modal
        visible={visible}
        onClose={onVisible}
        className={classNames('addLink', styles.modalAddLink)}
      >
        <div className='text-center'>
          <Text
            type='body-20-semibold'
            color='neutral-1'
            className='mb-[16px] mt-[24px] border-b border-solid border-[#EBEBEB] pb-[18px]'
          >
            {t('add_link_to_post')}
          </Text>
          <Form form={form} onFinish={onSubmit} initialValues={{ search: urlLinkInitial }}>
            <FormItem name='search'>
              <textarea
                placeholder={`${t('input_link')}...`}
                className='h-[100px] w-full px-[16px] outline-none'
              />
            </FormItem>
            <div className='mt-[16px] flex items-center justify-center border border-t border-solid border-[#EBEBEB]'>
              <Text
                type='body-16-semibold'
                color='neutral-black'
                className='w-1/2 cursor-pointer border-r border-solid border-[#EBEBEB] py-[14px]'
                onClick={onVisible}
              >
                {t('cancel')}
              </Text>

              <FormItem dependencies={['search']} shouldUpdate className='w-1/2'>
                {({ value }: any) => {
                  return (
                    <Text
                      type='body-16-semibold'
                      color='primary-2'
                      className={classNames(
                        'mx-auto cursor-pointer items-center justify-center py-[14px]',
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
