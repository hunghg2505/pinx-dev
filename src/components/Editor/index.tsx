import React, { forwardRef, useImperativeHandle } from 'react';

import Mention from '@tiptap/extension-mention';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import Form from 'rc-field-form';
import Upload from 'rc-upload';
import { RcFile } from 'rc-upload/lib/interface';

// import { requestAddComment } from '@components/Post/service';
// import FormItem from '@components/UI/FormItem';
// import Input from '@components/UI/Input';

import { requestAddComment } from '@components/Post/service';
import FormItem from '@components/UI/FormItem';
import Input from '@components/UI/Input';

import suggestion from './Suggestion';
import { isImage, toBase64 } from '../../utils/common';
// import { toBase64 } from '@';

interface IProps {
  id: string;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = isImage(file);
  if (!isJpgOrPng) {
    console.log('Không phải ảnh');
  }
  return isJpgOrPng;
};
// const onKeyPress = (data: any) => {
//   console.log('data', data.charCode);
//   // 64 -> @
//   // 37 -> %
//   // if()
// };
const Editor = (props: IProps, ref: any) => {
  const { id } = props;
  const [image, setImage] = React.useState<any>('');
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
  });
  const onStart = async (file: File) => {
    const imgae = await toBase64(file);
    setImage(imgae);
    // const stringImage = await base64ToBlob(imgae, file.type);
  };
  useImperativeHandle(ref, () => {
    return {
      onComment: (value: any) => onComment(value),
      // onLike: () => onLike(),
    };
  });
  const onComment = (value: any) => {
    editor?.commands.insertContent(
      `<span data-type="mention" class="mention bg-[red]" data-id="${value}" contenteditable="false">@${value}</span>`,
    );
  };
  // const onLike = () => {};
  const useAddComment = useRequest(
    (data: any) => {
      return requestAddComment(data);
    },
    {
      manual: true,
      onSuccess: (data: any) => {
        console.log('data', data);
      },
      onError: (err: any) => {
        console.log('err', err);
      },
    },
  );
  const onSend = () => {
    const text = editor?.getHTML();
    const data = {
      message: text,
      parentId: id,
    };
    useAddComment.run(data);
  };

  // const onChangeInput = (event: any) => {
  //   // console.log('data', event.key);
  // };

  return (
    <>
      <div>
        <div className='flex min-h-[40px] justify-between rounded-[1000px] border-[1px] border-solid border-[#E6E6E6] bg-[#FFFFFF] px-[15px]'>
          <Form className='w-full'>
            <div className='flex min-h-[40px] w-full items-center'>
              <Upload accept='png, jpeg, jpg' onStart={onStart} beforeUpload={beforeUpload}>
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
              <FormItem name='message' className=' w-full'>
                <Input className='h-[30px] w-full outline-none' />
              </FormItem>
              {/* <EditorContent editor={editor} className='w-full' /> */}
            </div>
          </Form>

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
        {image && (
          <Image
            src={image}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='h-[100px] w-[100px]'
          />
        )}
      </div>
    </>
  );
};

export default forwardRef(Editor);
