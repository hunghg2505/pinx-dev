import React from 'react';

import { Field } from 'rc-field-form';

import Editor from './Editor';

const Bio = () => {
  return (
    <Field name='bio'>
      {({ value, onChange }) => {
        return <Editor value={value} onChange={onChange} />;
      }}
    </Field>
  );
};
export default Bio;
