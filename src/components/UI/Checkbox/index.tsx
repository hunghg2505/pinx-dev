/* eslint-disable import/no-named-as-default */
import React from 'react';

import Checkbox from 'rc-checkbox';

import 'rc-checkbox/assets/index.css';

interface CheckBoxProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: any;
  tickAccent?: boolean;
}

interface Ref {
  ref?: React.Ref<HTMLInputElement>;
}

const RcCheckBox = React.forwardRef((props: CheckBoxProps, ref: Ref['ref']) => {
  const { className, disabled = false, children, checked, onChange, ...rest } = props;
  const checkboxRef = (ref as any) || React.createRef<HTMLInputElement>();

  return (
    <div className={className}>
      <div className='checkbox'>
        <Checkbox
          ref={checkboxRef}
          disabled={disabled}
          onChange={onChange}
          checked={checked}
          {...rest}
        />
      </div>

      {children}
    </div>
  );
});

export default RcCheckBox;
