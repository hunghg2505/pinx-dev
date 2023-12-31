/* eslint-disable import/named */
import React, { useState } from 'react';

import classNames from 'classnames';
import type { Dayjs } from 'dayjs';
import Picker, { PickerProps } from 'rc-picker';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import enUS from 'rc-picker/lib/locale/en_US';

import 'rc-picker/assets/index.css';
import { Calender } from '@components/UI/Icon/Calender';
import { NextIcon } from '@components/UI/Icon/NextIcon';
import { PrevIcon } from '@components/UI/Icon/PrevIcon';
import { SuperNextIcon } from '@components/UI/Icon/SuperNextIcon';
import { SuperPrevIcon } from '@components/UI/Icon/SuperPrevIcon';

import styles from './index.module.scss';

const MyPicker = (props: Omit<PickerProps<Dayjs>, 'locale' | 'generateConfig'>) => (
  // @ts-ignore
  <Picker
    generateConfig={dayjsGenerateConfig}
    locale={enUS}
    prevIcon={<PrevIcon />}
    nextIcon={<NextIcon />}
    superNextIcon={<SuperNextIcon />}
    superPrevIcon={<SuperPrevIcon />}
    {...props}
  />
);

interface CustomPickerProps {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onClick?: () => void;
  suffix?: React.ReactNode;
  onChange: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value?: string | number | undefined;
  name?: string;
  labelContent?: string;
  format?: string;
  defaultValue?: Dayjs;
  disabledDate?: PickerProps<Dayjs>['disabledDate'];
}

const LabelDatePicker = (props: CustomPickerProps) => {
  const {
    className,
    disabled = false,
    onClick,
    name,
    labelContent,
    onChange,
    format,
    defaultValue,
    disabledDate,
  } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const prefixCls = 'date-picker';

  const classes: string = classNames(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
    styles.customDatePicker,
  );

  const onFocus = () => {
    props.onFocus && props.onFocus();
    setIsFocus(true);
  };

  const onBlur = () => {
    props.onBlur && props.onBlur();
    setIsFocus(false);
  };

  const onChangeDate = (value: any) => {
    setIsSelected(true);
    onChange(value);
  };

  return (
    <div
      className={classNames(
        'relative rounded-t-lg border border-b-[1px] border-[--neutral-8] bg-[--neutral-8] px-3 pb-1 pt-2',
        styles.inputGroup,
      )}
    >
      <label
        className={classNames(styles.inputLabel, {
          [styles.inputLabelFocus]: isFocus || isSelected,
        })}
        htmlFor={'picker-' + name}
      >
        {labelContent}
      </label>
      <MyPicker
        disabled={disabled}
        className={classes}
        onClick={onClick}
        id={'picker-' + name}
        suffixIcon={<Calender />}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChangeDate}
        format={format}
        defaultValue={defaultValue}
        disabledDate={disabledDate}
      />
    </div>
  );
};

export default LabelDatePicker;
