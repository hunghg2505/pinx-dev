import Editor from '@components/Editor';

const ComponentRef = ({
  forwardedRef,
  id,
  refresh,
  refreshTotal,
  imageComment,
  onCommentImage,
  width,
}: {
  forwardedRef?: any;
  id: string;
  refresh: () => void;
  refreshTotal: () => void;
  imageComment: string;
  onCommentImage: (v: string) => void;
  width?: number;
}) => {
  return (
    <Editor
      imageComment={imageComment}
      onCommentImage={onCommentImage}
      ref={forwardedRef}
      id={id}
      refresh={refresh}
      refreshTotal={refreshTotal}
      width={width}
    />
  );
};
export default ComponentRef;
