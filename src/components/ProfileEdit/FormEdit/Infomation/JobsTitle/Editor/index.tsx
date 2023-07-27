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
        placeholder: t('enter_jobs_title'),
      }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-full',
      },
    },
    content: `<p>${value.replaceAll('\n', '</p><p>')}</p>`,
    onUpdate: ({ editor }: { editor: any }) => {
      if (editor) {
        let value = '';
        for (const node of editor.contentComponent.editorContentRef.current.childNodes[0]
          .childNodes) {
          value = value + node.textContent + '\n';
        }
        onChange(value.slice(0, 256));
      }
    },
  });
  return (
    <EditorContent
      editor={editor}
      className='line-[21px] mb-[12px] w-full py-2 text-[16px] text-neutral_black outline-none'
    />
  );
};
export default Editor;
