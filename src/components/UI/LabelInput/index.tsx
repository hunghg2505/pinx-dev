/* eslint-disable react/display-name */
import React, { useState } from 'react';

import classNames from 'classnames';

import { Eye, EyeHide } from '../Icon';


interface InputProps {
  className?: string;
  disabled?: boolean;
  type?: 'text' | 'password' | 'number' | 'hidden';
  placeholder?: string;
  onClick?: () => void;
  min?: number;
  max?: number;
  maxLength?: number;
  suffix?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  value?: string | number | undefined;
  step?: string | undefined;
  removeCommon?: boolean;
  name?: string;
}

interface Ref {
  ref?: React.Ref<HTMLInputElement>;
}

const LabelInput: React.FC<InputProps & Ref> = React.forwardRef((props: InputProps, ref: Ref['ref']) => {
  const {
    className,
    disabled = false,
    type = 'text',
    onClick,
    onBlur,
    suffix,
    removeCommon = false,
    step,
    maxLength,
    ...rest
  } = props;
  const inputRef = (ref as any) || React.createRef<HTMLInputElement>();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  // const { state: isVisibleEye, toggle: toggleEye } = useToggle(false);

  const isTypePassword: boolean = type === 'password';

  const prefixCls = 'input';

  const classes: string = classNames(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-${type}`]: type,
    },
    className,
  );

  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick && onClick();
  };

  const handleBlur = () => {
    if (type === 'number') {
      const inputValue: number = inputRef?.current?.value;

      const minNumber: number = (rest as any)?.min;
      const maxNumber: number = (rest as any)?.max;

      if (minNumber && minNumber > inputValue) {
        // Set number value to min if value less than min number
        inputRef.current.value = minNumber;
      }

      if (maxNumber && maxNumber < inputValue) {
        // Set number value to max if value greater than max number
        inputRef.current.value = maxNumber;
      }
    }

    onBlur?.();
  };

  const handleToggleEyes = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const EyePassword = () => {
    if (isPasswordVisible) {
      return <EyeHide onClick={handleToggleEyes} />;
    }

    return <Eye onClick={handleToggleEyes} />;
  };

  const implicitType = (): InputProps['type'] => {
    if (isTypePassword) {
      if (isPasswordVisible) {
        return 'text';
      }
      return 'password';
    }

    return type;
  };

  const blockInvalidCharNumber: string[] = ['e', 'E', '+', '-'];

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (type === 'number') {
      if (removeCommon) {
        blockInvalidCharNumber.push(',', '.');
      }

      const isBlockChar: boolean = blockInvalidCharNumber.includes(event.key);

      if (isBlockChar) {
        return event.preventDefault();
      }
    }
  };

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        type={implicitType()}
        disabled={disabled}
        className={classes}
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        step={step}
        maxLength={maxLength}
        {...rest}
      />

      {isTypePassword && !disabled && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
          <EyePassword />
        </div>
      )}

      {suffix && <div className={classNames('icon-suffix')}>{suffix}</div>}
    </div>
  );
});

export default LabelInput;

