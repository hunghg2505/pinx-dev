/* eslint-disable unicorn/prefer-add-event-listener */
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
  PAGE_NOT_FOUND: '/page-not-found',
  SEARCH: '/search',
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
  EDIT_MY_PROFILE: '/profile/edit',
  ASSET: '/profile/my-profile?tab=assets',
  PROFILE_VERIFICATION: '/profile/my-profile/profile-verification',
  DEACTIVATE_ACCOUNT: '/profile/my-profile/profile-verification/deactivate-account',
  WATCHLIST: '/watchlist',
  PROFILE_DETAIL: (id: number) => `/profile/${id}`,
};

export const formatMessage = (message: string, data: any) => {
  const str = message.split(' ');
  message = message.replaceAll('\n', '<p></p>');
  const tagPeople = data?.tagPeople?.map((item: any) => {
    return `@[${item?.displayName}](${item?.customerId})`;
  });
  const listStock = data?.tagStocks?.map((item: string) => {
    return `%[${item}](${item})`;
  });
  if (tagPeople) {
    for (const item of tagPeople) {
      const start = item.indexOf('[') + 1;
      const end = item.indexOf(']');
      const name = item.slice(start, end);
      const startId = item.indexOf('(') + 1;
      const endId = item.indexOf(')');
      const ID = item.slice(startId, endId);
      if (message && !message.includes(name)) {
        const newMessage = message.split(' ');
        for (const text of newMessage) {
          if (text.includes(ID)) {
            const startName = text.indexOf('@[') + 2;
            const endName = text.indexOf(']');
            const nameOld = text.slice(startName, endName);
            message = message.replace(
              `@[${nameOld}](${ID})`,
              `
              <a href="${window.location.origin}/profile/${ID}" className="tagStock tagpeople" data-type="userMention"><span>${name}</span></a>
              `,
            );
          }
        }
      }
      if (message && message.includes(name)) {
        message = message.replace(
          item,
          `
          <a href="${window.location.origin}/profile/${ID}" className="tagStock tagpeople"><span>${name}</span></a>
          `,
        );
      }
    }
  }
  if (listStock) {
    for (const item of listStock) {
      const start = item.indexOf('[') + 1;
      const end = item.indexOf(']');
      const name = item.slice(start, end);
      const startId = item.indexOf('(') + 1;
      const endId = item.indexOf(')');
      const ID = item.slice(startId, endId);
      if (message && message.includes(item)) {
        message = message.replace(
          item,
          `
          <a href="${window.location.origin}/stock/${ID}" className="tagStock">${name}</a>
          `,
        );
      }
    }
  }
  // eslint-disable-next-line array-callback-return
  str?.map((item) => {
    if (item.includes('#')) {
      message = message.replace(
        item,
        `
        <a href="javascript:void(0)" class="hashtag">${item}</a>
        `,
      );
    }
    if (item.includes('http') && !item.includes('\n')) {
      message = message.replaceAll(
        item,
        `
        <a href="javascript:void(0)" class="link">${item}</a>
        `,
      );
    }
    if (item.includes('http') && item.includes('\n')) {
      const newItem = item?.split('\n');
      for (const item of newItem) {
        if (item.includes('http')) {
          message = message.replaceAll(
            item,
            `
            <a href="javascript:void(0)" class="link">${item}</a>
            `,
          );
        }
      }
    }
    // }
  });
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
  // const metas: any = doc.body.querySelectorAll('.userName');
  const str = message.split(' ');
  message = message.replaceAll('\n', '<p></p>');
  // eslint-disable-next-line array-callback-return
  str?.map((item) => {
    if (item.includes('#')) {
      message = message.replace(
        item,
        `
        <a href="javascript:void(0)" class="hashtag">${item}</a>
        `,
      );
    }
    if (item.includes('http') && !item.includes('\n')) {
      message = message.replaceAll(
        item,
        `
        <a href="javascript:void(0)" class="link">${item}</a>
        `,
      );
    }
    if (item.includes('http') && item.includes('\n')) {
      const newItem = item?.split('\n');
      for (const item of newItem) {
        if (item.includes('http')) {
          message = message.replaceAll(
            item,
            `
            <a href="javascript:void(0)" class="link">${item}</a>
            `,
          );
        }
      }
    }
    // }
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

export const formatNumber = (value: number) => {
  return value.toLocaleString('en-US');
};

export const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
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

export const checkUserType = (custStat: string, acntStat?: string) => {
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
