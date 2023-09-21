/* eslint-disable unicorn/prefer-add-event-listener */
import imageCompression from 'browser-image-compression';
import Compressor from 'compressorjs';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';

import { ACNT_STAT_ACTIVE, ACNT_STAT_VSD_PENDING, USERTYPE } from './constant';

export const ROUTE_PATH = {
  // AUTH
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  REGISTER_OTP_VERIFICATION: '/auth/register-verification',
  REGISTER_USER_NAME: '/auth/register-user-name',
  LOGIN_OTP_VERIFICATION: '/auth/login-verification',
  REGISTER_COMPANY: '/auth/register-company',
  REGISTER_THEME: '/auth/register-theme',
  REGISTER_TOPIC: '/auth/register-topic',
  UPDATE_USER_PROFILE: '/auth/update-user-profile',

  HOME: '/',
  REDIRECT: '/redirecting',
  POST_DETAIL_PATH: '/post',
  PINEX_TOP_20: 'pinex-top-20',
  EXPLORE: '/explore',
  THEME: '/theme',
  THEME_DETAIL: (id: string) => `/theme/${id}`,
  PEOPLEINSPOTLIGHT: '/people-in-spotlight',
  TOPMENTION: '/top-mention',
  POST_DETAIL: (id: string) => `${ROUTE_PATH.POST_DETAIL_PATH}/${id}`,
  STOCK_DETAIL: (stockCode: string) => `/stock/${stockCode}`,
  STOCK_EVENT: (stockCode: string) => `${ROUTE_PATH.STOCK_DETAIL(stockCode)}/financial-calendar`,
  STOCK_REVIEW: (stockCode: string) => `${ROUTE_PATH.STOCK_DETAIL(stockCode)}/rating`,
  STOCK_ALSO_OWN: (stockCode: string) => `${ROUTE_PATH.STOCK_DETAIL(stockCode)}/also-own`,
  STOCK_NEWS: (stockCode: string) => `${ROUTE_PATH.STOCK_DETAIL(stockCode)}/news`,
  STOCK_SUBSCRIBER: (stockCode: string) => `${ROUTE_PATH.STOCK_DETAIL(stockCode)}/subscriber`,
  STOCK_RELATED: (stockCode: string, hashtagId: string) =>
    `${ROUTE_PATH.STOCK_DETAIL(stockCode)}/related/${hashtagId}`,
  SEARCH: '/search',
  SEARCHSEO: '/search-seo',
  TOP_WATCHING: '/top-watching',
  GIFTCASH: '/gift-cash',
  NOT_FOUND: '/404',

  // SETTING
  SETTING: '/setting',
  SETTING_CHANGE_USERNAME: '/setting/change-username',
  SETTING_CHANGE_USERNAME_VERIFICATION: '/setting/change-username/verification',
  SETTING_CHANGE_PASSWORD: '/setting/change-password',
  SETTING_CHANGE_PASSWORD_VERIFICATION: '/setting/change-password/verification',

  // MY PROFILE
  PROFILE: '/profile',
  MY_PROFILE: '/profile/my-profile',
  MY_PROFILE_FOLLOWING: '/profile/my-profile/follow?tab=following',
  MY_PROFILE_FOLLOWER: '/profile/my-profile/follow?tab=followers',
  EDIT_MY_PROFILE: '/profile/my-profile/edit',
  ASSET: '/profile/my-profile?tab=assets',
  PROFILE_VERIFICATION: '/profile/my-profile/profile-verification',
  DEACTIVATE_ACCOUNT: '/profile/my-profile/profile-verification/deactivate-account',
  WATCHLIST: '/watchlist',
  PROFILE_PATH: '/profile',
  PROFILE_DETAIL: (id: number) => `${ROUTE_PATH.PROFILE_PATH}/${id}`,
};

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

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => resolve(reader.result));
    reader.onerror = (error) => reject(error);
  });

export const base64ToBlob = (base64: any, type: any) => {
  const base64Slice = base64.split(',')[1];
  const binStr = window.atob(base64Slice.replaceAll(/\s/g, ''));
  const len = binStr.length;
  const buffer = new ArrayBuffer(len);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    // eslint-disable-next-line unicorn/prefer-code-point
    arr[i] = binStr.charCodeAt(i);
  }
  const blob = new Blob([arr], { type });
  return URL.createObjectURL(blob);
};

// export const EXT_IMAGE = ['jpg', 'jpeg', 'png', 'webp'];
export const EXT_IMAGE = ['jpg', 'jpeg', 'png'];
export const isImage = (file: any) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split('.');

  return file.type?.includes('image') && EXT_IMAGE.includes(name[name?.length - 1]?.toLowerCase());
};
export function toNonAccentVietnamese(str: any) {
  str = str.replaceAll(/[AÀÁÂÃĂẠẤẦẪẬẮẰẴẶ]/g, 'A');
  str = str.replaceAll(/[àáâãăạảấầẩẫậắằẳẵặ]/g, 'a');
  str = str.replace(/[EÈÉÊẸẼẾỀỄỆ]/, 'E');
  str = str.replaceAll(/[èéêẹẻẽếềểễệ]/g, 'e');
  str = str.replaceAll(/[IÌÍĨỊ]/g, 'I');
  str = str.replaceAll(/[ìíĩỉị]/g, 'i');
  str = str.replaceAll(/[OÒÓÔÕƠỌỐỒỖỘỚỜỠỢ]/g, 'O');
  str = str.replaceAll(/[òóôõơọỏốồổỗộớờởỡợ]/g, 'o');
  str = str.replaceAll(/[UÙÚŨƯỤỨỪỮỰ]/g, 'U');
  str = str.replaceAll(/[ùúũưụủứừửữự]/g, 'u');
  str = str.replaceAll(/[YÝỲỴỸ]/g, 'Y');
  str = str.replaceAll(/[ýỳỵỷỹ]/g, 'y');
  str = str.replaceAll('Đ', 'D');
  str = str.replaceAll('đ', 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replaceAll(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // Huyền sắc hỏi ngã nặng
  // eslint-disable-next-line no-misleading-character-class
  str = str.replaceAll(/[\u02C6\u0306\u031B]/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const getMonthName = (monthNumber: number, localeParam = 'en-US') => {
  const locale = localeParam === 'vi' ? 'vi-VN' : localeParam;
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString(locale, { month: 'long' });
};

export const encryptPassword = (value: string) => {
  const hash = sha256(value);
  const pass = Base64.stringify(hash);
  return pass;
};

export const imageStock = (stock_code: string) => {
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    stock_code?.length === 3 || stock_code?.[0] !== 'C' ? stock_code : stock_code?.slice(1, 4)
  }.png`;
  return url;
};

export const enableScroll = () => {
  document.body.style.overflow = 'scroll';
};

export const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

export const isValidURL = (urlString: any) => {
  const res = `${urlString}`
    .trim()
    .match(/(http(s)?:\/\/.)?(www\.)?[\w#%+.:=@~-]{2,256}\.[a-z]{2,6}\b([\w#%&+./:=?@~-]*)/g);
  return res !== null;
};

export const calcUserStatusText = (acntStat: string) => {
  switch (acntStat) {
    case ACNT_STAT_ACTIVE: {
      return 'Verified';
    }
    case ACNT_STAT_VSD_PENDING: {
      return 'Pending';
    }
    default: {
      return 'Unverified';
    }
  }
};

export const checkUserType = (custStat?: string, acntStat?: string) => {
  if (custStat === USERTYPE.NEW) {
    return USERTYPE.NEW;
  }
  if (custStat === USERTYPE.PRO && acntStat === USERTYPE.VSD_REJECTED) {
    return USERTYPE.EKYC;
  }
  return USERTYPE.VSD;
};

export const getMeta = (doc: any) => {
  const metas: any = doc.querySelectorAll('meta');

  const summary = [];

  for (const meta of metas) {
    const property = meta.getAttribute('property');
    const content = meta.getAttribute('content');

    if (property && content) {
      summary.push({
        property,
        content,
      });
    }
  }

  return summary;
};

export const getVideoId = (url: string, site: string) => {
  const siteLower = `${site}`.toLowerCase();

  if (!url || !site) {
    return false;
  }

  if (siteLower === 'youtube') {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  if (siteLower === 'tiktok') {
    // Parse basic url and embeds
    const basicReg = /tiktok\.com(.*)\/video\/(\d+)/gm;
    const basicParsed = basicReg.exec(url);
    if (basicParsed && basicParsed.length > 2) {
      return basicParsed[2];
    }
  }

  if (siteLower === 'vimeo') {
    let string_ = url;
    if (string_.includes('#')) {
      [string_] = string_.split('#');
    }

    if (string_.includes('?') && !string_.includes('clip_id=')) {
      [string_] = string_.split('?');
    }

    let id;
    let array;

    const event = /https?:\/\/vimeo\.com\/event\/(\d+)$/;

    const eventMatches = event.exec(string_);

    if (eventMatches && eventMatches[1]) {
      return eventMatches[1];
    }

    const primary = /https?:\/\/vimeo\.com\/(\d+)/;

    const matches = primary.exec(string_);
    if (matches && matches[1]) {
      return matches[1];
    }

    const vimeoPipe = [
      'https?://player.vimeo.com/video/[0-9]+$',
      'https?://vimeo.com/channels',
      'groups',
      'album',
    ].join('|');

    const vimeoRegex = new RegExp(vimeoPipe, 'gim');

    if (vimeoRegex.test(string_)) {
      array = string_.split('/');
      if (array && array.length > 0) {
        id = array.pop();
      }
    } else if (/clip_id=/gim.test(string_)) {
      array = string_.split('clip_id=');
      if (array && array.length > 0) {
        [id] = array[1].split('&');
      }
    }

    return id;
  }

  return false;
};

export const getQueryFromUrl = () => {
  try {
    if (!location.search) {
      return {};
    }

    const search = location.search.slice(1);
    return JSON.parse(
      '{"' +
        decodeURI(search).replaceAll('"', '\\"').replaceAll('&', '","').replaceAll('=', '":"') +
        '"}',
    );
  } catch {
    return {};
  }
};
export const converStringMessageToObject = (message: string, data: any) => {
  const listStock = data?.tagStocks;
  const listUserId = data?.tagPeople?.map((item: any) => item.customerId);
  const txt = message?.split('\n');
  const ignore: any = [];
  const newObject = {
    type: 'doc',
    content: txt?.map((item) => {
      const checkSplit = item.split(' ')?.reduce((acc: any, cur: any, index: any, array: any) => {
        const isStart = cur.includes('[');
        const isEnd = cur.includes(']');
        const isHashTag = cur.includes('#');

        if (isStart && !isEnd && !isHashTag) {
          for (const [i, item] of array.entries()) {
            if (cur === item) {
              continue;
            }
            if (i <= index) {
              continue;
            }

            ignore.push(i);

            cur = cur?.concat(` ${item}`);

            const isEndItem = item.includes(']');

            if (isEndItem) {
              break;
            }
          }
        }

        const can = !ignore.includes(index);

        if (can) {
          const nCur = `${cur}`;
          const startId = nCur.includes('(') && nCur.indexOf('(') + 1;
          const endId = nCur.includes(')') && nCur.indexOf(')');
          let ID = '';
          if (startId && endId) {
            ID = nCur.slice(startId, endId);
          }
          const isStock = listStock?.includes(ID);
          const isPeopelTag = listUserId?.includes(Number(ID));
          const isSepecial = Boolean(
            (nCur.charAt(0) === '@' && isPeopelTag) ||
              (nCur.charAt(0) === '%' && isStock) ||
              nCur.charAt(0) === '#',
          );

          if (isSepecial) {
            acc.push(nCur);
          } else {
            // eslint-disable-next-line unicorn/prefer-at
            const prevItem = acc[acc.length - 1];
            if (prevItem) {
              const startId = prevItem.includes('(') && prevItem.indexOf('(') + 1;
              const endId = prevItem.includes(')') && prevItem.indexOf(')');
              let ID = '';
              if (startId && endId) {
                ID = prevItem.slice(startId, endId);
              }
              const isStock = listStock?.includes(ID);
              const isPeopelTag = listUserId?.includes(Number(ID));
              const isPrevItemSepecial = Boolean(
                (prevItem.charAt(0) === '@' && isPeopelTag) ||
                  (prevItem.charAt(0) === '%' && isStock) ||
                  prevItem.charAt(0) === '#',
              );

              if (isPrevItemSepecial) {
                acc.push(nCur);
              } else {
                acc[acc.length - 1] = `${prevItem} ${nCur}`;
              }
            } else {
              acc.push(nCur);
            }
          }
        }
        return acc;
      }, []);
      const newArray = checkSplit?.map((item: any, index: number) => {
        const b = [];
        if (item.includes('@') || item[0] === '#') {
          const a = index === 0 ? [item, ''] : [item, ''];
          b.push(a);
        } else {
          b.push(item);
        }
        return b.flat();
      });
      const addSpace = newArray.flat();
      const data = addSpace?.map((check: any) => {
        if (check.includes('@')) {
          const start = check.indexOf('[') + 1;
          const end = check.indexOf(']');
          const name = check.slice(start, end);
          const startId = check.indexOf('(') + 1;
          const endId = check.indexOf(')');
          const ID = check.slice(startId, endId);
          if (listUserId?.includes(Number(ID))) {
            return {
              type: 'userMention',
              attrs: {
                id: ID,
                label: `${name}`,
              },
            };
          }
          return {
            type: 'text',
            text: check,
          };
        }
        if (check.includes('%') && check.charAt(0) === '%') {
          const start = check.indexOf('[') + 1;
          const end = check.indexOf(']');
          const name = check.slice(start, end);
          if (listStock?.includes(name)) {
            return {
              type: 'stockMention',
              attrs: {
                // eslint-disable-next-line unicorn/no-null
                id: null,
                label: name,
              },
            };
          }
          return {
            type: 'text',
            text: check,
          };
        }
        if (check.includes('#') && check.charAt(0) === '#') {
          return {
            type: 'hashTag',
            attrs: {
              // eslint-disable-next-line unicorn/no-null
              id: null,
              label: check,
            },
          };
          // const newArray = check.split(' ');
          // const newArrayHashTag = newArray?.map((item: any) => {
          //   const b = [];
          //   if (item.includes('#')) {
          //     const a = [item, ''];
          //     b.push(a);
          //   } else {
          //     b.push(item);
          //   }
          //   return b.flat();
          // });
          // const newData = newArrayHashTag?.flat()?.map((itemHashTag: any) => {
          //   if (itemHashTag.includes('#')) {
          //     return {
          //       type: 'hashTag',
          //       attrs: {
          //         // eslint-disable-next-line unicorn/no-null
          //         id: null,
          //         label: itemHashTag,
          //       },
          //     };
          //   }
          //   if (!itemHashTag.includes('#') && itemHashTag === '') {
          //     return {
          //       type: 'text',
          //       text: ' ',
          //     };
          //   }
          //   return {
          //     type: 'text',
          //     text: itemHashTag,
          //   };
          // });
          // return newData;
        }
        if (!check.includes('%') && !check.includes('@') && !check.includes('#') && check === '') {
          return {
            type: 'text',
            text: ' ',
          };
        }
        return {
          type: 'text',
          text: check,
        };
      });
      return {
        type: 'paragraph',
        content: data.flat(),
      };
    }),
  };
  return newObject;
};

export default async function getSeoDataFromLink(url: string) {
  try {
    if (!url) {
      throw new Error('URL is required');
    }

    if (url.includes('tiktok')) {
      const rest: any = await fetch(`https://www.tiktok.com/oembed?url=${new URL(url)}`).then(
        (res: any) => res.json(),
      );

      const formatMetaTiktok = [
        { property: 'og:site_name', content: rest?.provider_name || 'Tiktok' },
        { property: 'og:url', content: url || '' },
        { property: 'og:image', content: rest?.thumbnail_url || '' },
        { property: 'og:title', content: rest?.author_name || '' },
        { property: 'og:description', content: rest?.title || 'Tiktok' },
        { property: 'og:site_name', content: rest?.provider_name || 'Tiktok' },
      ];

      return formatMetaTiktok;
    }

    const rest = await fetch(new URL(url)).then((res: any) => res.text());

    const doc = new DOMParser().parseFromString(rest as string, 'text/html');

    const metas: any = doc.querySelectorAll('meta');

    const summary = [];

    for (const meta of metas) {
      const tempsum: any = {};
      const attributes = meta.getAttributeNames();
      for (const attribute of attributes) {
        tempsum[attribute] = meta.getAttribute(attribute);
      }
      summary.push(tempsum);
    }
    return summary;
  } catch {
    return [
      {
        property: 'og:url',
        content: url,
      },
    ];
  }
}
export function validateHTML(htmlString: any) {
  const testHtml = /<(?:"[^"]"["']|'[^']'["']|[^"'>])+>/g.test(htmlString);
  return testHtml;
}

export const getStockColor = (
  last_price: number,
  ceil_price: number,
  floor_price: number,
  ref_price: number,
) => {
  if (last_price === ceil_price) {
    return '#782AF9';
  }
  if (last_price === floor_price) {
    return '#22D1E9';
  }
  if (last_price === ref_price) {
    return '#F1BA09';
  }
  if (last_price < ref_price) {
    return '#DA314F';
  }
  return '#128F63';
};

export const kFormatter = (num: number) => {
  return Math.abs(num) > 999
    ? formatStringToNumber((Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1)).toString()) + 'K'
    : Math.sign(num) * Math.abs(num);
};

export const formatStringToNumber = (value: any, isComma = true, minimumFractionDigits = 0) => {
  if (!value) {
    return '';
  }
  if (Number.isNaN(value)) {
    return value;
  }
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
  });

  const numString = value.toString();

  const num = numString.includes('.') ? numString.slice(0, numString.indexOf('.') + 3) : numString;

  return formatter.format(+num).replaceAll(',', isComma ? ',' : '.');
};
export function storeQueryToSession(storage: Storage, key: string, value: string) {
  if (!value) {
    return;
  }
  const existing = storage.getItem(key);
  if (!existing) {
    storage.setItem(key, value);
  }
}

// check url valid
export const isUrlValid = (url?: string) => {
  let isValid = false;
  if (url && url.includes('http')) {
    isValid = true;
  }

  return isValid;
};

// convert image to jpg
export enum CONVERT_IMAGE_ERR_MSG {
  FILE_INVALID = 'FILE_INVALID',
  ERROR = 'ERROR',
}
export const convertImageToJpg = async (
  file: File | Blob,
  onSuccess: (file: Blob | null) => Promise<void>,
  onError?: (message: string) => void,
): Promise<void> => {
  if (!['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.type)) {
    onError && onError(CONVERT_IMAGE_ERR_MSG.FILE_INVALID);
  }

  const imageConverted: Blob | null = await new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const img = new Image();
      img.src = e.target?.result?.toString() || '';

      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx: any = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);

        // fill background color to png file
        if (file.type === 'image/png') {
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'white';
          ctx?.fillRect(0, 0, canvas.width, canvas.height);
        }

        canvas.toBlob(async (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            onError && onError(CONVERT_IMAGE_ERR_MSG.ERROR);
          }
        }, 'image/jpeg');
      };
    };

    reader.readAsDataURL(file);
  });

  await onSuccess(imageConverted);
};

// compress image

interface compressImageParams {
  file: File | Blob;
  targetQuality?: number;
  maxFileSizeKB: number;
  onSuccess: (file: File | Blob) => Promise<void>;
  onCompressStart?: () => void;
  onError?: (message: any) => void;
  compressorOpt?: any;
}
export const compressorImage = async ({
  file,
  targetQuality = 0.9,
  maxFileSizeKB,
  onSuccess,
  onCompressStart,
  onError,
  compressorOpt,
}: compressImageParams) => {
  try {
    let compressedImage: File | Blob = file;
    const initFileSizeKB = file.size / 1024;
    let quality = targetQuality;
    onCompressStart && onCompressStart();

    if (initFileSizeKB > maxFileSizeKB) {
      while (quality >= 0 && compressedImage.size / 1024 > maxFileSizeKB) {
        compressedImage = await new Promise((resolve, reject) => {
          // eslint-disable-next-line no-new
          new Compressor(file, {
            quality,
            ...compressorOpt,
            success(result) {
              resolve(result);
            },
            error(error) {
              reject(error.message);
            },
          });
        });

        if (compressedImage.size / 1024 > maxFileSizeKB) {
          quality -= 0.1;
        }
      }
    } else {
      compressedImage = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-new
        new Compressor(file, {
          ...compressorOpt,
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error.message);
          },
        });
      });
    }

    await onSuccess(compressedImage);
  } catch (error) {
    onError && onError(error);
  }
};

interface CompressImageParams {
  file: File;
  maxFileSizeKb?: number;
  quality?: number;
  options?: any;
  maxWidthOrHeight?: number;
}

export const compressImage = async ({
  file,
  maxFileSizeKb,
  quality,
  options,
  maxWidthOrHeight = 1280,
}: CompressImageParams) => {
  const initOptions: any = { ...options };
  const fileSizeKB = file.size / 1024;

  if (maxFileSizeKb) {
    initOptions.maxSizeMB = maxFileSizeKb / 1024;
  }

  if (quality) {
    initOptions.initialQuality = quality;
  }

  try {
    if ((maxFileSizeKb && fileSizeKB > maxFileSizeKb) || quality) {
      const compressedImage = await imageCompression(file, {
        ...initOptions,
        maxWidthOrHeight,
        alwaysKeepResolution: true,
      });

      return compressedImage;
    }

    return file;
  } catch {}
};

export const slugify = (value?: string) => {
  if (!value) {
    return '';
  }

  // Remove diacritics
  const withoutDiacritics = value.normalize('NFD').replaceAll(/[\u0300-\u036F]/g, '');

  // Replace spaces and special characters with hyphens
  const slug = withoutDiacritics
    .replaceAll(/[^\d\sA-Za-z]/g, '')
    .trim()
    .replaceAll(/\s+/g, '-'); // Replace spaces with hyphens

  // Convert to lowercase
  return slug.toLowerCase();
};

export const formatTitlePost = (title: string) => {
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
