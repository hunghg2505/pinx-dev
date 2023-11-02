export const formatMessagePost = (message: string) => {
  const doc = document.createRange().createContextualFragment(message);
  const divUser = doc.querySelector('.userName')?.innerHTML;
  if (divUser) {
    const textReplace = divUser?.replace('@', '');
    message = message.replaceAll(divUser, textReplace);
  }
  const divStock = doc.querySelector('.stockMention')?.innerHTML;
  if (divStock) {
    const textReplace = divStock?.replace('%', '');
    message = message.replaceAll(divStock, textReplace);
  }
  const textLink = doc.querySelector('p')?.innerHTML;
  if (textLink && textLink?.includes('http')) {
    message = message.replaceAll(
      textLink,
      `<a href="javascript:void(0)" class="link">${textLink}</a>`,
    );
  }

  // const metas: any = doc.body.querySelectorAll('.userName');
  const str = message.split(' ');
  // message = message.replaceAll('\n', '<p></p>');
  // eslint-disable-next-line array-callback-return
  str?.map((item) => {
    if (item[0] === '#') {
      message = message.replace(
        item,
        `
        <a href="javascript:void(0)" class="hashtag">${item}</a>
        `,
      );
    }
  });
  return message;
};
