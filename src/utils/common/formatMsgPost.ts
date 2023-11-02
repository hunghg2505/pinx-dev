/**
 * Format message include tag stock, tag user, hashtag
 */
export const formatMsgPost = (title: string) => {
  if (!title) {
    return '';
  }

  let titleFormat = title;
  const userMentionPattern = /@\[(.*?)]\((.*?)\)/g;
  const stockMentionPattern = /%\[(.*?)]\((.*?)\)/g;
  const hashtagPattern = /#(\S+)/g;

  titleFormat = titleFormat.replaceAll(userMentionPattern, (_, b) => b);
  titleFormat = titleFormat.replaceAll(stockMentionPattern, (_, b) => b);
  titleFormat = titleFormat.replaceAll(hashtagPattern, (_, b) => b);

  return titleFormat;
};
