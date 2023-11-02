// comment
export const PRIVATE_COMMENT_OF_COMMENT = (comment_Id: string) =>
  `/private/comment/${comment_Id}/comments`;
export const PUBLIC_COMMENT_OF_COMMENT = (comment_Id: string) =>
  `/public/comment/${comment_Id}/children`;
export const PRIVATE_DETAIL_OF_COMMENT = (comment_Id: string) =>
  `/private/comment/${comment_Id}/details`;
export const PRIVATE_EDIT_COMMENT = (comment_Id: string) => `/private/comment/${comment_Id}/edit`;
export const PRIVATE_LIKE_COMMENT = (comment_Id: string) => `/private/comment/${comment_Id}/like`;
export const PRIVATE_UNLIKE_COMMENT = (comment_Id: string) =>
  `/private/comment/${comment_Id}/unlike`;
export const PRIVATE_REPLY_COMMENT = (comment_Id: string) => `/private/comment/${comment_Id}/reply`;
export const PRIVATE_REPORT_COMMENT = (comment_Id: string) =>
  `/private/comment/${comment_Id}/report`;
export const PRIVATE_DELETE_COMMENT = (id: string) => `/private/comment/${id}`;
export const PRIVATE_ADD_COMMENT = '/private/comment/add';
export const PRIVATE_ADD_COMMENT_V2 = '/private/comment/addV2';
export const PRIVATE_REPLY_COMMENT_V2 = (comment_Id: string) =>
  `/private/comment/${comment_Id}/replyV2`;
