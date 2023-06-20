/* eslint-disable indent */
/* eslint-disable react/display-name */
import React from 'react';

import classNames from 'classnames';


interface ButtonProps {
  className?: string;
  customClassName?: string;
  disabled?: boolean;
  children?: any;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = React.forwardRef((props: ButtonProps) => {
  const {
    className,
    disabled = false,
    onClick,
    children,
    customClassName,
    ...rest
  } = props;
  const prefixCls = 'button';

  const classes: string = classNames(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
    customClassName,
  );

  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick && onClick();
  };


  return (
    <div className='relative'>
      <button
        disabled={disabled}
        className={classes}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </button>
    </div>
  );
});

export const PositiveButton = ({ ...props }) => (
  <Button {...props} customClassName='text-white font-[700] text-[17px] bg-[--primary-2] rounded-[10px] py-[14px] text-center' />
);

export const NegativeButton = ({ ...props }) => (
  <Button {...props} customClassName='border border-[--primary-6] text-[--primary-2] font-[700] text-[17px] bg-[--primary-3] rounded-[10px] py-[14px] text-center' />
);

export const MainButton = ({ ...props }) => (
  <Button {...props} customClassName='text-white font-[700] text-[17px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] rounded-[10px] py-[14px] text-center' />
);


export const RoundButton = (props: ButtonProps) => {
  const {
    disabled = false,
    ...rest
  } = props;
  return (
    <Button
      {...rest}
      customClassName={
        classNames(
          'border border-[--primary-6] text-[--primary-2] font-[700] text-[17px] bg-[--primary-3] rounded-full py-[14px] text-center',
          {
            'border-none text-[--neutral-5] !bg-[--neutral-8]': disabled,
          }
        )}
    />
  );
}
