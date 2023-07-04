import Editor from '@components/Editor';

const ComponentRef = ({
  forwardedRef,
  id,
  refresh,
  refreshTotal,
  setImageCommentMobile,
  width,
}: {
  forwardedRef?: any;
  id: string;
  refresh: () => void;
  refreshTotal: () => void;
  setImageCommentMobile: (v: boolean) => void;
  width?: number;
}) => {
  return (
    <Editor
      setImageCommentMobile={setImageCommentMobile}
      ref={forwardedRef}
      id={id}
      refresh={refresh}
      refreshTotal={refreshTotal}
      width={width}
    />
  );
};
export default ComponentRef;
