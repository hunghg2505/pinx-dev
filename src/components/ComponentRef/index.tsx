import Editor from '@components/Editor';

const ComponentRef = ({ forwardedRef, id }: { forwardedRef: any; id: string }) => {
  return <Editor ref={forwardedRef} id={id} />;
};
export default ComponentRef;
