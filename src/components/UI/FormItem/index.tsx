import React from 'react';

import classNames from 'classnames';
import { Field } from 'rc-field-form';

import Text from '../Text';

interface Props {
  children: any;
  name?: string;
  hideError?: boolean;
  className?: string;
  [k: string]: any;
  dependencies?: string[];
}

const FormItem: React.FC<Props> = ({ children, hideError = false, className, ...props }: Props) => {
  return (
    <Field {...props}>
      {({ onChange, value }, meta, context) => {
        const { errors } = meta;
        const hasError: string = errors && errors[0];
        return (
          <div className={classNames('flex flex-col', className)}>
            <div className='h-full w-full'>
              {typeof children === 'function'
                ? children({ onChange, value, meta, hasError }, context)
                : React.cloneElement(children, { onChange, value, hasError, ...children.props })}
            </div>

            {!hideError && hasError && (
              <Text type='body-14-regular' className='mt-[4px] text-left text-[#DA314F]'>
                {hasError}
              </Text>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default FormItem;
