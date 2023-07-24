import React from 'react';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

const Bio = () => {
  const { t } = useTranslation('editProfile');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: t('enter_bio'),
      }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-full',
      },
    },
  });
  return (
    <Field name='bio'>
      {({ value, onChange }) => {
        return (
          <>
            <label
              htmlFor='displayName'
              className='line-[16px] mb-[12px] block text-[12px] text-neutral_gray'
            >
              {t('Bio')}
            </label>
            <EditorContent
              value={value}
              editor={editor}
              onChange={onChange}
              className='line-[21px] mb-[12px] w-full py-2 text-[16px] text-neutral_black outline-none'
            />
            <hr className='mb-[24px] border-neutral_07' />
          </>
        );
      }}
    </Field>
  );
};
export default Bio;
