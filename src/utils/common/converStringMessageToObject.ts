export const converStringMessageToObject = (message: string) => {
  // const listStock = data?.tagStocks;
  // const listUserId = data?.tagPeople?.map((item: any) => item.customerId);
  // const txt = message?.split('\n');
  // const ignore: any = [];
  // const newObject = {
  //   type: 'doc',
  //   content: txt?.map((item) => {
  //     const checkSplit = item.split(' ')?.reduce((acc: any, cur: any, index: any, array: any) => {
  //       const isStart = cur.includes('[');
  //       const isEnd = cur.includes(']');
  //       const isHashTag = cur.includes('#');

  //       if (isStart && !isEnd && !isHashTag) {
  //         for (const [i, item] of array.entries()) {
  //           if (cur === item) {
  //             continue;
  //           }
  //           if (i <= index) {
  //             continue;
  //           }

  //           ignore.push(i);

  //           cur = cur?.concat(` ${item}`);

  //           const isEndItem = item.includes(']');

  //           if (isEndItem) {
  //             break;
  //           }
  //         }
  //       }

  //       const can = !ignore.includes(index);

  //       if (can) {
  //         const nCur = `${cur}`;
  //         const startId = nCur.includes('(') && nCur.indexOf('(') + 1;
  //         const endId = nCur.includes(')') && nCur.indexOf(')');
  //         let ID = '';
  //         if (startId && endId) {
  //           ID = nCur.slice(startId, endId);
  //         }
  //         const isStock = listStock?.includes(ID);
  //         const isPeopelTag = listUserId?.includes(Number(ID));
  //         const isSepecial = Boolean(
  //           (nCur.charAt(0) === '@' && isPeopelTag) ||
  //             (nCur.charAt(0) === '%' && isStock) ||
  //             nCur.charAt(0) === '#',
  //         );

  //         if (isSepecial) {
  //           acc.push(nCur);
  //         } else {
  //           // eslint-disable-next-line unicorn/prefer-at
  //           const prevItem = acc[acc.length - 1];
  //           if (prevItem) {
  //             const startId = prevItem.includes('(') && prevItem.indexOf('(') + 1;
  //             const endId = prevItem.includes(')') && prevItem.indexOf(')');
  //             let ID = '';
  //             if (startId && endId) {
  //               ID = prevItem.slice(startId, endId);
  //             }
  //             const isStock = listStock?.includes(ID);
  //             const isPeopelTag = listUserId?.includes(Number(ID));
  //             const isPrevItemSepecial = Boolean(
  //               (prevItem.charAt(0) === '@' && isPeopelTag) ||
  //                 (prevItem.charAt(0) === '%' && isStock) ||
  //                 prevItem.charAt(0) === '#',
  //             );

  //             if (isPrevItemSepecial) {
  //               acc.push(nCur);
  //             } else {
  //               acc[acc.length - 1] = `${prevItem} ${nCur}`;
  //             }
  //           } else {
  //             acc.push(nCur);
  //           }
  //         }
  //       }
  //       return acc;
  //     }, []);
  //     const newArray = checkSplit?.map((item: any, index: number) => {
  //       const b = [];
  //       if (item.includes('@') || item[0] === '#') {
  //         const a = index === 0 ? [item, ''] : [item, ''];
  //         b.push(a);
  //       } else {
  //         b.push(item);
  //       }
  //       return b.flat();
  //     });
  //     const addSpace = newArray.flat();
  //     const data = addSpace?.map((check: any) => {
  //       if (check[0] === '@') {
  //         // [ABC()[] das](491)
  //         const userMentionPattern = /@\[(.*?)]\((.*?)\)/g;
  //         const found = [...check.matchAll(userMentionPattern)];
  //         // const start = check.indexOf('[') + 1;
  //         // const startId = check.indexOf('(', -1) + 1;
  //         // const end = check.indexOf(']', startId - 2);
  //         const name = found[0][1];
  //         // const endId = check.indexOf(')', end);
  //         const ID = found[0][2];

  //         if (listUserId?.includes(Number(ID))) {
  //           return {
  //             type: 'userMention',
  //             attrs: {
  //               id: ID,
  //               label: `${name}`,
  //             },
  //           };
  //         }
  //         return {
  //           type: 'text',
  //           text: check,
  //         };
  //       }
  //       if (check.includes('%') && check.charAt(0) === '%') {
  //         const start = check.indexOf('[') + 1;
  //         const end = check.indexOf(']');
  //         const name = check.slice(start, end);
  //         if (listStock?.includes(name)) {
  //           return {
  //             type: 'stockMention',
  //             attrs: {
  //               // eslint-disable-next-line unicorn/no-null
  //               id: null,
  //               label: name,
  //             },
  //           };
  //         }
  //         return {
  //           type: 'text',
  //           text: check,
  //         };
  //       }
  //       if (check.includes('#') && check.charAt(0) === '#') {
  //         return {
  //           type: 'hashTag',
  //           attrs: {
  //             // eslint-disable-next-line unicorn/no-null
  //             id: null,
  //             label: check,
  //           },
  //         };
  //         // const newArray = check.split(' ');
  //         // const newArrayHashTag = newArray?.map((item: any) => {
  //         //   const b = [];
  //         //   if (item.includes('#')) {
  //         //     const a = [item, ''];
  //         //     b.push(a);
  //         //   } else {
  //         //     b.push(item);
  //         //   }
  //         //   return b.flat();
  //         // });
  //         // const newData = newArrayHashTag?.flat()?.map((itemHashTag: any) => {
  //         //   if (itemHashTag.includes('#')) {
  //         //     return {
  //         //       type: 'hashTag',
  //         //       attrs: {
  //         //         // eslint-disable-next-line unicorn/no-null
  //         //         id: null,
  //         //         label: itemHashTag,
  //         //       },
  //         //     };
  //         //   }
  //         //   if (!itemHashTag.includes('#') && itemHashTag === '') {
  //         //     return {
  //         //       type: 'text',
  //         //       text: ' ',
  //         //     };
  //         //   }
  //         //   return {
  //         //     type: 'text',
  //         //     text: itemHashTag,
  //         //   };
  //         // });
  //         // return newData;
  //       }
  //       if (!check.includes('%') && !check.includes('@') && !check.includes('#') && check === '') {
  //         return {
  //           type: 'text',
  //           text: ' ',
  //         };
  //       }
  //       return {
  //         type: 'text',
  //         text: check,
  //       };
  //     });
  //     return {
  //       type: 'paragraph',
  //       content: data.flat(),
  //     };
  //   }),
  // };
  // return newObject;
  const paragraphs = message?.split('\n').map((paragraph) => {
    const content: any = [];
    const mentions = paragraph.match(/(@\[.*?]\((.*?)\)|#(\S+)|%\[(.*?)]\((.*?)\)|\S+|\s+)/g);

    if (mentions) {
      for (const mention of mentions) {
        if (mention.startsWith('@[')) {
          const [, label, id] = mention.match(/@\[(.*?)]\((.*?)\)/) || [];
          content.push({
            type: 'userMention',
            attrs: {
              id,
              label,
            },
          });
        } else if (mention.startsWith('#')) {
          content.push({
            type: 'hashTag',
            attrs: {
              id: null,
              label: mention,
            },
          });
        } else if (mention.startsWith('%[')) {
          const [, label] = mention.match(/%\[(.*?)]\((.*?)\)/) || [];
          content.push({
            type: 'stockMention',
            attrs: {
              id: null,
              label,
            },
          });
        } else {
          content.push({
            type: 'text',
            text: mention,
          });
        }
      }
    }

    return {
      type: 'paragraph',
      content,
    };
  });
  return {
    type: 'doc',
    content: paragraphs,
  };
};
