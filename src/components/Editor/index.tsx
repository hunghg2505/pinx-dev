import React, { forwardRef, useImperativeHandle } from 'react';

import Mention from '@tiptap/extension-mention';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from 'next/image';
import Upload from 'rc-upload';
import { BeforeUploadFileType } from 'rc-upload/lib/interface';

import { base64ToBlob, toBase64 } from '@utils/common';

import suggestion from './Suggestion';

interface IProps {}

const Editor = (props: IProps, ref: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention bg-[red]',
        },
        suggestion,
      }),
    ],
    editorProps: {
      attributes: {
        class: ' focus:outline-none',
      },
    },
    // content: '<p>Hello World! 🌎️</p>',
  });

  useImperativeHandle(ref, () => {
    return {
      onComment: (value: any) => onComment(value),
      onOpen: () => {
        return console.log('123');
      },
    };
  });
  const onComment = (value: any) => {
    editor?.commands.insertContent(
      `<span data-type="mention" class="mention bg-[red]" data-id="${value}" contenteditable="false">@${value}</span>`,
    );
  };
  const onSend = () => {
    const text = editor?.getHTML();
    console.log('🚀 ~ file: index.tsx:10 ~ Tiptap ~ text:', text);
  };

  const handleBeforeUpload: any = async (info: any) => {
    console.log('🚀 ~ file: index.tsx:54 ~ consthandleBeforeUpload:any= ~ info:', info);
    try {
      if (!info?.file?.originFileObj?.type?.includes('image')) {
        return;
      }

      const base64 = await toBase64(info?.file?.originFileObj);
      const toBlob = await base64ToBlob(base64, info?.file?.originFileObj?.type);

      const objectImg = {
        blobUrl: toBlob,
        file: info?.file?.originFileObj,
      };
      console.log('🚀 ~ file: index.tsx:66 ~ consthandleBeforeUpload:any= ~ objectImg:', objectImg);
    } catch {}
  };
  return (
    <>
      <div className='flex h-[40px] justify-between rounded-[1000px] border-[1px] border-solid border-[#E6E6E6] bg-[#FFFFFF] px-[15px]'>
        <div className='flex w-full items-center'>
          <Upload
            accept='png, jpeg, jpg'
            beforeUpload={handleBeforeUpload}
            onSuccess={(data: any) => console.log('123', data)}
            onChange={(data) => console.log('data on change', data)}
          >
            <Image
              src='/static/icons/iconCamnera.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='mr-[8px] w-[19px]'
            />
          </Upload>

          <div className='mr-[8px] h-[24px] w-[1px] bg-[#E6E6E6]'></div>
          <EditorContent editor={editor} className='w-full' />
        </div>
        <Image
          src='/static/icons/iconSend.svg'
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='w-[19px]'
          onClick={onSend}
        />
      </div>
    </>
  );
};

export default forwardRef(Editor);
