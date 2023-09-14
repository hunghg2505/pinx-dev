import { forwardRef } from 'react';

import dynamic from 'next/dynamic';

const ComponentRef = dynamic(import('@components/ComponentRef'), {
  ssr: false,
});

export const ForwardedRefComponentPostDetail = forwardRef((props: any, ref) => {
  return (
    <ComponentRef
      {...props}
      forwardedRef={ref}
      id={props.id}
      refresh={props.refresh}
      refreshCommentOfComment={props?.refreshCommentOfComment}
      refreshTotal={props.refreshTotal}
      width={props?.width}
      canExpand={props?.canExpand}
      isReply={props.isReply}
      onAddComment={props?.onAddComment}
    />
  );
});
