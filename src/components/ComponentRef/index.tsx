import Editor from '@components/Editor';

const ComponentRef = ({ forwardedRef }: { forwardedRef: any }) => {
  return <Editor ref={forwardedRef} />;
};
export default ComponentRef;
