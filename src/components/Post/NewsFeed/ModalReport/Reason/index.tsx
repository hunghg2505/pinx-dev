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
    // if (isNumber(value) && val === +value) {
    //   return onChange?.(undefined);
    // }
    onChange?.(val);
  };

  return (
    <div className=''>
      <div className=''>
        {options?.map((item, index) => {
          return (
            <Radio
              checked={!value ? false : value === item.value}
              onChange={() => onValueChange(item.value)}
              key={index}
            >
              <Text>{item.label}</Text>
            </Radio>
          );
        })}
      </div>
    </div>
  );
};

export default Reason;
