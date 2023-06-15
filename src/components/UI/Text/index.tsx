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
  | 'body-12-regular'
  | 'body-12-medium'
  | 'body-12-bold'
  | 'body-14-regular'
  | 'body-14-bold'
  | 'body-16-bold'
  | 'body-18-regular'
  | 'body-20-bold'
  | 'body-22-bold'
  | 'body-28-bold'
  | 'body-24-bold'
  | undefined;
  color?:
  | 'cwhite'
  | 'cblack'
  | 'primary-1'
  | 'primary-2'
  | 'primary-3'
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
  | 'semantic-1'
  | undefined;
  disabled?: boolean;
  state?: null | 'disable';
  className?: string;
  onClick?: () => void;
  element?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
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
