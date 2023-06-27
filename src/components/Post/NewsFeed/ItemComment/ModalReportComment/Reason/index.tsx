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
    <div>
      {options?.map((item, index) => {
        return (
          <div key={index} className='[&:not(:last-child)]:mb-[20px]'>
            <Radio
              checked={value ? value === item.value : false}
              onChange={() => onValueChange(item.value)}
              className='mb-[22px]'
            >
              <Text type='body-14-medium' color='cbblack'>
                {item.label}
              </Text>
            </Radio>
          </div>
        );
      })}
    </div>
  );
};

export default Reason;
