import Editor from '@components/Editor';

const ComponentRef = ({
  forwardedRef,
  id,
  refresh,
  refreshTotal,
  setImageCommentMobile,
  width,
  canExpand, // For styling in Post Detail
  isReply,
  refreshCommentOfComment,
  onAddComment,
}: {
  forwardedRef?: any;
  id: string;
  refresh?: () => void;
  refreshTotal: () => void;
  setImageCommentMobile: (v: boolean) => void;
  width?: number;
  canExpand?: boolean;
  isReply?: boolean;
  refreshCommentOfComment?: (v: any) => void;
  onAddComment?: (v: any) => void;
}) => {
  return (
    <Editor
      setImageCommentMobile={setImageCommentMobile}
      onAddComment={onAddComment}
      ref={forwardedRef}
      id={id}
      refresh={refresh}
      refreshTotal={refreshTotal}
      width={width}
      canExpand={canExpand}
      isReply={isReply}
      refreshCommentOfComment={refreshCommentOfComment}
    />
  );
};
export default ComponentRef;
