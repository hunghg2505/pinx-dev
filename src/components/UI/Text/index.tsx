import React from 'react';

import classNames from 'classnames';

interface TextProps {
  children: React.ReactNode;
  type?:
    | 'h1-bold'
    | 'h1-regular'
    | 'h2-bold'
    | 'h2-regular'
    | 'h3-bold'
    | 'h3-regular'
    | 'body-10-regular'
    | 'body-12-regular'
    | 'body-12-medium'
    | 'body-12-bold'
    | 'body-12-semibold'
    | 'body-13-regular'
    | 'body-13-semibold'
    | 'body-14-regular'
    | 'body-14-bold'
    | 'body-14-semibold'
    | 'body-14-medium'
    | 'body-16-medium'
    | 'body-18-regular'
    | 'body-20-semibold'
    | 'body-20-medium'
    | 'body-24-regular'
    | 'body-24-semibold'
    | 'body-16-regular'
    | 'body-16-bold'
    | 'body-16-semibold'
    | 'body-20-bold'
    | 'body-22-bold'
    | 'body-24-bold'
    | 'body-28-bold'
    | 'body-30-bold'
    | 'barlow-16-medium'
    | 'barlow-12-medium'
    | undefined;
  color?:
    | 'cbwhite'
    | 'cbblack'
    | 'primary-1'
    | 'primary-2'
    | 'primary-3'
    | 'primary-4'
    | 'primary-5'
    | 'primary-6'
    | 'neutral-1'
    | 'neutral-2'
    | 'neutral-3'
    | 'neutral-4'
    | 'neutral-5'
    | 'neutral-6'
    | 'neutral-7'
    | 'neutral-8'
    | 'neutral-9'
    | 'neutral-black'
    | 'neutral-gray'
    | 'neutral-darkgray'
    | 'semantic-1'
    | 'semantic-2-1'
    | 'semantic-2-2'
    | 'semantic-3'
    | 'gray'
    | undefined;
  disabled?: boolean;
  state?: null | 'disable';
  className?: string;
  onClick?: () => void;
  element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Text: React.FC<TextProps> = ({
  type,
  color,
  disabled = false,
  className = '',
  onClick = () => {},
  children,
  element = 'p',
}) => {
  const classes = classNames(type, color, { 'text-disable': disabled }, className);

  return React.createElement(
    element,
    {
      className: classes,
      onClick,
    },
    React.createElement(React.Fragment, undefined, children),
  );
};

export default Text;
