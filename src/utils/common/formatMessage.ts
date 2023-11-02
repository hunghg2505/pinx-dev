export const formatMessage = (message: string) => {
  // console.log(message.split('\n'));
  // const str = message.split(' ');

  // const ignore: any = [];
  // const checkSplit = message
  //   .split('\n')
  //   .join(' ')
  //   .split(' ')
  //   ?.reduce((acc: any, cur: any, index: any, array: any) => {
  //     const isStart = cur.includes('[');
  //     const isEnd = cur.includes(']');
  //     const isHashTag = cur.includes('#');

  //     if (isStart && !isEnd && !isHashTag) {
  //       for (const [i, item] of array.entries()) {
  //         if (cur === item) {
  //           continue;
  //         }
  //         if (i <= index) {
  //           continue;
  //         }

  //         ignore.push(i);

  //         cur = cur?.concat(` ${item}`);

  //         const isEndItem = item.includes(']');

  //         if (isEndItem) {
  //           break;
  //         }
  //       }
  //     }

  //     const can = !ignore.includes(index);

  //     if (can) {
  //       const nCur = `${cur}`;

  //       const isSepecial = Boolean(nCur.includes('@') || nCur.includes('%') || nCur.includes('#'));
  //       if (isSepecial) {
  //         acc.push(nCur);
  //       } else {
  //         // eslint-disable-next-line unicorn/prefer-at
  //         const prevItem = acc[acc.length - 1];
  //         if (prevItem) {
  //           const isPrevItemSepecial = Boolean(
  //             prevItem.includes('@') || prevItem.includes('%') || prevItem.includes('#'),
  //           );

  //           if (isPrevItemSepecial) {
  //             acc.push(nCur);
  //           } else {
  //             acc[acc.length - 1] = `${prevItem} ${nCur}`;
  //           }
  //         } else {
  //           acc.push(nCur);
  //         }
  //       }
  //     }
  //     return acc;
  //   }, []);
  // message = message.replaceAll('\n', '<p></p>');
  // const tagPeople = data?.tagPeople?.map((item: any) => {
  //   return `@[${item?.displayName}](${item?.customerId})`;
  // });
  // const listStock = data?.tagStocks?.map((item: string) => {
  //   return `%[${item}](${item})`;
  // });
  // const listHashTag = data?.hashtags?.map((item: any) => {
  //   return item;
  // });
  // if (tagPeople?.length > 0) {
  //   for (const item of tagPeople) {
  //     const start = item.indexOf('[') + 1;
  //     const end = item.indexOf(']');
  //     const name = item.slice(start, end);
  //     const startId = item.indexOf('(') + 1;
  //     const endId = item.indexOf(')');
  //     const ID = item.slice(startId, endId);
  //     if (message) {
  //       for (const text of checkSplit) {
  //         if (text.includes(ID)) {
  //           const startName = text.indexOf('@[') + 2;
  //           const endName = text.indexOf(']');
  //           const nameOld = text.slice(startName, endName);
  //           message = message.replace(
  //             `@[${nameOld}](${ID})`,
  //             `
  //             <div class="tagStock tagpeople mention" data-type="userMention"><span class="people" id=${ID}>${name}</span></div>
  //             `,
  //           );
  //         }
  //       }
  //     }
  //     // if (message && message.includes(name)) {
  //     //   message = message.replace(
  //     //     item,
  //     //     `
  //     //     <div class="tagStock tagpeople mention" data-type="dataStock"><span class="people" id=${ID}>${name}</span></div>
  //     //     `,
  //     //   );
  //     // }
  //   }
  // }
  // if (listStock?.length > 0) {
  //   for (const item of listStock) {
  //     const start = item.indexOf('[') + 1;
  //     const end = item.indexOf(']');
  //     const name = item.slice(start, end);
  //     if (message && message.includes(item)) {
  //       message = message.replaceAll(
  //         item,
  //         `
  //         <div class="mention"><span class="tagStock">${name}</span></div>
  //         `,
  //       );
  //     }
  //   }
  // }

  // if (listHashTag?.length > 0) {
  //   for (const item of listHashTag) {
  //     if (message && message.includes(item)) {
  //       // const newItem = item.replace('#', '');
  //       message = message.replaceAll(
  //         item,
  //         `<div class="mention"><span class="hashtag">${item}</span></div>`,
  //       );
  //     }
  //   }
  // }

  // // eslint-disable-next-line array-callback-return
  // str?.map((item) => {
  //   // if (item.includes('#')) {
  //   //   // const newItem = item.replace('#', '');
  //   //   message = message.replaceAll(
  //   //     item,
  //   //     `
  //   //     <a href="javascript:void(0)" class="hashtag">${item}</a>
  //   //     `,
  //   //   );
  //   // }
  //   if (item.includes('http') && !item.includes('\n')) {
  //     const index = item.indexOf('http');
  //     const newUrl = item.slice(index);
  //     const txt = item.slice(0, index);
  //     message = message.replaceAll(
  //       item,
  //       `<div class="mention txtLink">${txt}<span class="link">${newUrl}</span></div>`,
  //     );
  //   }
  //   if (item.includes('http') && item.includes('\n')) {
  //     const newItem = item?.split('\n');
  //     for (const item of newItem) {
  //       if (item.includes('http')) {
  //         const index = item.indexOf('http');
  //         const newUrl = item.slice(index);
  //         const txt = item.slice(0, index);
  //         message = message.replaceAll(
  //           item,
  //           `<div class="mention txtLink">${txt}<span class="link">${newUrl}</span></div>`,
  //         );
  //       }
  //     }
  //   }
  //   // }
  // });
  // return message;
  // Regular expression patterns for matching the different formats
  const userMentionPattern = /@\[(.*?)]\((.*?)\)/g;
  const itemMentionPattern = /%\[(.*?)]\((.*?)\)/g;
  const hashtagPattern = /#(\S+)/g;
  const urlPattern = /#?((https|http)?:\/\/\S+)/g;

  // Replace user mentions
  message = message.replaceAll(
    userMentionPattern,
    (_, name, id) =>
      `<div class="tagStock tagpeople mention" data-type="userMention"><span class="people" id="${id}">${name} </span></div>`,
  );

  // Replace item mentions
  message = message.replaceAll(
    itemMentionPattern,
    (_, item) => `<div class="mention"><span class="tagStock">${item} </span></div>`,
  );

  // Replace hashtags
  message = message.replaceAll(
    hashtagPattern,
    (_, item) => `<div class="mention"><span class="hashtag">#${item} </span></div>`,
  );

  // Replace URLs
  message = message.replaceAll(
    urlPattern,
    (match, url) =>
      `<div class="mention txtLink">${
        match[0] === '#' ? '#' : ''
      }<span class="link">${url} </span></div>`,
  );
  message = message.replaceAll('\n', '<br/>');
  return message;
};
