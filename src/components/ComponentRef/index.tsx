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
}: {
  forwardedRef?: any;
  id: string;
  refresh: () => void;
  refreshTotal: () => void;
  setImageCommentMobile: (v: boolean) => void;
  width?: number;
  canExpand?: boolean;
  isReply?: boolean;
}) => {
  return (
    <Editor
      setImageCommentMobile={setImageCommentMobile}
      ref={forwardedRef}
      id={id}
      refresh={refresh}
      refreshTotal={refreshTotal}
      width={width}
      canExpand={canExpand}
      isReply={isReply}
    />
  );
};
export default ComponentRef;
