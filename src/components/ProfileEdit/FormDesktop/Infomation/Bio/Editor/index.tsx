import React from 'react';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useTranslation } from 'next-i18next';

const Editor = ({ value, onChange }: { value: any; onChange: (value: any) => void }) => {
  const { t } = useTranslation('editProfile');
  const editor: any = useEditor({
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
    content: value,
    onUpdate: ({ editor }: { editor: any }) => {
      if (editor) {
        const value =
          editor.contentComponent.editorContentRef.current.childNodes[0].childNodes[0].textContent;
        onChange(value);
      }
    },
  });
  return (
    <EditorContent
      editor={editor}
      className='line-[18px] mb-[12px]  w-full resize-y rounded-[5px] bg-neutral_08  px-[16px] py-[12px] text-[14px] text-neutral_black outline-none'
    />
  );
};
export default Editor;
