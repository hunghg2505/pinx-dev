import Editor from '@components/Editor';

const ComponentRef = ({
  forwardedRef,
  id,
  refresh,
}: {
  forwardedRef: any;
  id: string;
  refresh: () => void;
}) => {
  return <Editor ref={forwardedRef} id={id} refresh={refresh} />;
};
export default ComponentRef;
