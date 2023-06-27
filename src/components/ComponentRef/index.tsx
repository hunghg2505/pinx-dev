import Editor from '@components/Editor';

const ComponentRef = ({
  forwardedRef,
  id,
  refresh,
  refreshTotal,
}: {
  forwardedRef: any;
  id: string;
  refresh: () => void;
  refreshTotal: () => void;
}) => {
  return <Editor ref={forwardedRef} id={id} refresh={refresh} refreshTotal={refreshTotal} />;
};
export default ComponentRef;
