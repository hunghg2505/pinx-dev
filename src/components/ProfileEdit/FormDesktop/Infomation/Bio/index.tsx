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
      {({ onChange }) => {
        return (
          <>
            <EditorContent
              editor={editor}
              onChange={onChange}
              className='line-[18px] mb-[12px]  w-full resize-y rounded-[5px] bg-neutral_08  px-[16px] py-[12px] text-[14px] text-neutral_black outline-none'
            />
          </>
        );
      }}
    </Field>
  );
};
export default Bio;
