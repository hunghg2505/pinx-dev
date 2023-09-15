/* eslint-disable indent */
/* eslint-disable react/display-name */
import React from 'react';

import classNames from 'classnames';

import Loading from '@components/UI/Loading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  customClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  children?: any;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    className,
    disabled = false,
    onClick,
    children,
    customClassName,
    loading,
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
      <button disabled={disabled} className={classes} onClick={handleClick} {...rest}>
        {loading && (
          <span className='pointer-events-none absolute translate-x-[-28px]'>
            <Loading />
          </span>
        )}
        {children}
      </button>
    </div>
  );
};

export const PositiveButton = ({ ...props }: ButtonProps) => (
  <Button
    {...props}
    customClassName='text-white font-[700] text-[17px] bg-[--primary-2] rounded-[10px] py-[14px] text-center'
  />
);

export const NegativeButton = ({ ...props }: ButtonProps) => (
  <Button
    {...props}
    customClassName='border border-[--primary-6] text-[--primary-2] font-[700] text-[17px] bg-[--primary-3] rounded-[10px] py-[14px] text-center'
  />
);

export const MainButton = ({ ...props }: ButtonProps) => (
  <Button
    {...props}
    customClassName='text-white font-[700] text-[17px] bg-[linear-gradient(238.35deg,_#1D6CAB_7.69%,_#589DC0_86.77%)] rounded-[10px] py-[14px] text-center'
  />
);

export const SemiMainButton = ({ ...props }: ButtonProps) => (
  <Button
    {...props}
    customClassName='text-[#1F6EAC] font-[700] text-[17px] bg-[#EEF5F9] rounded-[10px] py-[14px] text-center'
  />
);

export const NegativeMainButton = ({ ...props }: ButtonProps) => (
  <Button
    {...props}
    customClassName='text-[#1F6EAC] font-[700] text-[17px] bg-[--neutral-8] rounded-[10px] py-[14px] text-center'
  />
);

export const ErrorMainButton = ({ ...props }: ButtonProps) => (
  <Button
    {...props}
    customClassName='text-[#DA314F] font-[700] text-[17px] bg-[--neutral-8] rounded-[10px] py-[14px] text-center'
  />
);

export const RoundButton = (props: ButtonProps) => {
  const { disabled = false, ...rest } = props;
  return (
    <Button
      {...rest}
      customClassName={classNames(
        'border border-[--primary-6] text-[--primary-2] font-[700] text-[17px] bg-[--primary-3] rounded-full py-[14px] text-center',
        {
          'border-none text-[--neutral-5] !bg-[--neutral-8]': disabled,
        },
      )}
    />
  );
};

export const ExploreButton = (props: ButtonProps) => {
  return <Button {...props} customClassName='w-full rounded-[8px] bg-[#EAF4FB] py-[14px]' />;
};
