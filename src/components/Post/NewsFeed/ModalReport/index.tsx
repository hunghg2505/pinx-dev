import React from 'react';

import 'rc-dialog/assets/index.css';

import Dialog from 'rc-dialog';
import Form from 'rc-field-form';

import RcCheckBox from '@components/UI/Checkbox';
import FormItem from '@components/UI/FormItem';
import Text from '@components/UI/Text';

import Reason from './Reason';

interface IProps {
  children: any;
  closeIcon?: boolean;
}
const ModalReport = (props: IProps) => {
  const { children, closeIcon } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const onVisible = () => {
    setVisible(!visible);
  };
  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return <>x</>;
  };
  const onFinish = () => {
    const value = form.getFieldsValue();
    console.log('🚀 ~ file: index.tsx:25 ~ onFinish ~ value:', value);
  };
  const options = [
    {
      label: 'Ngôn ngữ không phù hợp',
      value: '1',
    },
    {
      label: 'Spam',
      value: '2',
    },
    {
      label: 'Ngôn ngữ gây kích động / bạo lực',
      value: '3',
    },
    {
      label: 'Khác',
      value: '4',
    },
  ];
  return (
    <>
      <span onClick={onVisible} className='cursor-pointer'>
        {children}
      </span>
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()}>
        <div>
          <Text>Báo cáo</Text>
          <Text>Lý do mà bạn muốn báo cáo vi phạm phản hồi này.</Text>
          <Text>Cho chúng tôi biết chuyện gì đang diễn ra</Text>
          <Form form={form} onFinish={onFinish}>
            <FormItem
              name='reason'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lý do',
                },
              ]}
            >
              <Reason options={options} />
            </FormItem>
            <FormItem name='remember'>
              {({ value, onChange }: { value: boolean; onChange: any }) => {
                return (
                  <RcCheckBox onChange={() => onChange(!value)} checked={!!value}>
                    <Text>Remember</Text>
                  </RcCheckBox>
                );
              }}
            </FormItem>
            <div className='w-full border-t border-solid border-black'>
              <div onClick={onVisible}>123</div>
              <button className='w-2/4' type='submit'>
                Gửi
              </button>
            </div>
          </Form>
        </div>
      </Dialog>
    </>
  );
};
export default ModalReport;
