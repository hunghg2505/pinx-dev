import React from 'react';

import Dialog from 'rc-dialog';
import Form from 'rc-field-form';
import request from 'umi-request';

import FormItem from '@components/UI/FormItem';
import Text from '@components/UI/Text';

interface IProps {
  children: any;
  closeIcon?: any;
  getDataOG: (value: any) => void;
}
const ModalLink = (props: IProps) => {
  const { children, closeIcon, getDataOG } = props;
  const [visible, setVisible] = React.useState<boolean>(false);
  const onVisible = async () => {
    setVisible(!visible);
    const text = await navigator.clipboard.readText();
    if (text && text.includes('http')) {
      form.setFieldValue('search', text);
    }
  };
  const [form] = Form.useForm();
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
        className='w-[13px]'
      />
    );
  };
  const onSubmit = async () => {
    const value = form.getFieldValue('search');
    const data = await request(value);
    const doc = new DOMParser().parseFromString(data, 'text/html');
    const metas: any = doc.querySelectorAll('meta');
    const summary = [];
    for (const meta of metas) {
      const tempsum: any = {};
      const attributes = meta.getAttributeNames();
      for (const attribute of attributes) {
        tempsum[attribute] = meta.getAttribute(attribute);
      }
      summary.push(tempsum);
    }
    const dataFormat: any = {};
    for (const item of summary) {
      if (item && item.property) {
        dataFormat[item.property] = item.content;
      }
    }
    getDataOG(dataFormat);
    setVisible(!visible);
  };

  return (
    <>
      <span onClick={onVisible}>{children}</span>
      <Dialog
        visible={visible}
        onClose={onVisible}
        closeIcon={renderCloseIcon()}
        className='addLink'
      >
        <div className='text-center'>
          <Text type='body-20-semibold' color='neutral-1' className='mb-[8px]'>
            Add link to post
          </Text>
          <div className='my-[10px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <Form form={form} className='h-[121px]'>
            <FormItem name='search' className='flex  h-full flex-col items-start justify-start'>
              <textarea placeholder='Input link...' className=' h-full w-full outline-none' />
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
              Cancel
            </Text>
            <Text
              type='body-16-semibold'
              color='primary-2'
              className='w-2/4 cursor-pointer'
              onClick={onSubmit}
            >
              Save
            </Text>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default React.forwardRef(ModalLink);
