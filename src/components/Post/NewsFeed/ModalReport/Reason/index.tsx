import React from 'react';

import Radio from '@components/UI/Radio';
import Text from '@components/UI/Text';

interface IOptions {
  label: string;
  value: string;
}
interface Props {
  value?: string;
  onChange?: (val: string) => void;
  options?: IOptions[];
}

const Reason = ({ value, onChange, options }: Props) => {
  const onValueChange = (val: string) => {
    onChange?.(val);
  };

  return (
    <div className='mb-[22px]'>
      {options?.map((item, index) => {
        return (
          <Radio
            checked={!value ? false : value === item.value}
            onChange={() => onValueChange(item.value)}
            key={index}
            className='mb-[22px]'
          >
            <Text type='body-14-medium' color='cbblack'>
              {item.label}
            </Text>
          </Radio>
        );
      })}
    </div>
  );
};

export default Reason;
