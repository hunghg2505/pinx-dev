import React from 'react';

import cls from 'classnames';
import Select, { Option } from 'rc-select';

export interface OptionSelect {
  value: string | number;
  label: string;
  prefix?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  icon?: React.ReactNode;
  isComming?: boolean;
}
interface SelectProps {
  defaultValue?: any;
  options?: OptionSelect[];
  className?: string;
  placeholder?: string;
  classNameDropdown?: string;
  icon?: string;
  open?: boolean;
  value?: string | number | undefined;
  onChange?: (value: string | number, option?: any) => void;
}

const RCSelect: React.FC<SelectProps> = (props: SelectProps) => {
  const {
    options = [],
    className,
    classNameDropdown,
    onChange,
    defaultValue,
    value,
    ...rest
  } = props;

  return (
    <div className='checkbox-container'>
      <Select
        className={cls(['rcselect', className])}
        dropdownClassName={cls(['menu', classNameDropdown])}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        dropdownMatchSelectWidth={true}
        {...rest}
      >
        {options.map(
          ({ label, value, prefix, suffix, icon, isComming }: OptionSelect, index: number) => {
            return (
              <Option
                value={value}
                key={`${label}-${value}-${index}`}
                className={isComming ? 'disable' : ''}
              >
                {icon}
                {prefix}
                {label}
                {suffix}
              </Option>
            );
          },
        )}
      </Select>

      {/* <Icon
        icon='chevron_down'
        color={props?.value ? NEUTRAL.NEUTRAL_0 : PRIMARY.PRIMARY_100}
        size={23}
      /> */}
    </div>
  );
};

export default RCSelect;
