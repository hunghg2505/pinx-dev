import Editor from '@components/Editor';

const ComponentRef = ({
  forwardedRef,
  id,
  refresh,
  refreshTotal,
  imageComment,
  onCommentImage,
}: {
  forwardedRef: any;
  id: string;
  refresh: () => void;
  refreshTotal: () => void;
  imageComment: string;
  onCommentImage: (v: string) => void;
}) => {
  return (
    <Editor
      imageComment={imageComment}
      onCommentImage={onCommentImage}
      ref={forwardedRef}
      id={id}
      refresh={refresh}
      refreshTotal={refreshTotal}
    />
  );
};
export default ComponentRef;
