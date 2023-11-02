import React from 'react';

import { EditorContent } from '@tiptap/react';

const EditorContainer = ({ editor, className, style }: any) => {
  return <EditorContent editor={editor} className={className} style={style} />;
};

export default EditorContainer;
