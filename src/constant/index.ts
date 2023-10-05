const ZALO_OAID = '3853758560685742933';
const SHARE_THIS_PROPERTY_ID = '64e5ad507cfc45001a61d322';
const POPUP_COMPONENT_ID = 'md-popup-container';
const RC_DIALOG_CLASS_NAME = 'rc-dialog-container';
// const GOOGLE_PLAY_DOWNLOAD = 'https://play.google.com/store/apps/details?id=com.pinetree.pist';
// const APP_STORE_DOWNLOAD = 'https://apps.apple.com/vn/app/pinex/id1570570518';
const GOOGLE_PLAY_DOWNLOAD = 'https://pinex.onelink.me/Z5Ma/webp';
const APP_STORE_DOWNLOAD = 'https://pinex.onelink.me/Z5Ma/webp';
const ONE_LINK_DOWNLOAD = 'https://pinex.onelink.me/Z5Ma/webp';
const MOBILE_SCREEN_MAX_WIDTH = 768;
const AUTH_TAB_TYPE = {
  LOGIN: 'login',
  REGISTER: 'register',
};
const PRODUCT_COMPANY_IMAGE = (fileName: string) =>
  `https://static.pinetree.com.vn/internal/public/customer/image?fileName=${fileName}&type=PRODUCT_COMPANY`;

const MAX_AVATAR_FILE_SIZE_KB = 150;
const MAX_COVER_FILE_SIZE_KB = 100;
const COVER_SIZE = {
  width: 1280,
  height: 720,
};
const AVATAR_SIZE = {
  width: 150,
  height: 150,
};

const MAX_IMG_POST_CMT_FILE_SIZE_KB = 500;
const BANNER_URL = 'https://pinex.vn/static/images/sidebar_banner.png';
const WHITE_BACKGROUND_IMAGE = '/static/images/white-background.jpeg';

// sit
const GOOGLE_TAG_MANAGER_ID = 'GTM-WHBTBND5';

// product
// const GOOGLE_TAG_MANAGER_ID = 'GTM-5BXCJM3';
// const MIXPANEL_PROJECT_TOKEN = '7aec54370ff568a7f07d6380cb4529ce';

const SEO_TEXT_SEARCH = {
  EXPLORE_PAGE: 'Explore-theme',
  TOP_WATCHING_PAGE: 'Top-watch-stock',
  TOP_MENTION_PAGE: 'Top-mention-stock',
};

const DEEP_LINK = {
  OPEN_APP: 'https://pino.pinex.vn/app-pinex?screenName=pinetree.pist.feed',
  ASSETS: 'https://pino.pinex.vn/app-pinex?screenName=pinetree.pist.assets',
  GIFT_CASH: 'https://pino.pinex.vn/app-pinex?screenName=pinetree.pist.gifts',
  SIGNUP: 'https://pino.pinex.vn/app-pinex?screenName=pinetree.pist.signup.activeAccountQuestion',
};

const GUIDANCE_LINK = {
  VI: 'https://drive.google.com/file/d/1ypvJzKfyR2A9UQ_nXOQHTzRlcnxPxVmS/view?usp=sharing',
  EN: 'https://drive.google.com/file/d/10o8Rx_baR2Rkz7KkRoccwaoLNo-wi7LJ/view?usp=sharing',
};

export {
  ZALO_OAID,
  SHARE_THIS_PROPERTY_ID,
  POPUP_COMPONENT_ID,
  RC_DIALOG_CLASS_NAME,
  GOOGLE_PLAY_DOWNLOAD,
  APP_STORE_DOWNLOAD,
  MOBILE_SCREEN_MAX_WIDTH,
  AUTH_TAB_TYPE,
  PRODUCT_COMPANY_IMAGE,
  ONE_LINK_DOWNLOAD,
  MAX_AVATAR_FILE_SIZE_KB,
  MAX_COVER_FILE_SIZE_KB,
  COVER_SIZE,
  AVATAR_SIZE,
  MAX_IMG_POST_CMT_FILE_SIZE_KB,
  BANNER_URL,
  WHITE_BACKGROUND_IMAGE,
  GOOGLE_TAG_MANAGER_ID,
  SEO_TEXT_SEARCH,
  DEEP_LINK,
  GUIDANCE_LINK,
};

export const IMAGE_COMPANY_URL = 'https://static.pinetree.com.vn/upload/images/companies/';
export const TOAST_LIMIT = 1;
export const REGISTER_INSTRUCTIONS_LINK =
  'https://static.pinetree.com.vn/upload/huong-dan-mo-tk-20221214.pdf';
export const TERM_AND_CONDITION_LINK = 'https://pinetree.vn/html/pinex-disclosures.html';
export const PINETREE_LINK = 'https://pinetree.vn/';
export const enum USERTYPE {
  NEW = 'NEW',
  PRO = 'PRO',
  VSD_PENDING = 'VSD_PENDING',
  VSD_REJECTED = 'VSD_REJECTED',
  EKYC = 'EKYC',
  VSD = 'VSD',
  LOGIN = 'LOGIN',
  NOTLOGIN = 'NOTLOGIN',
  ACTIVE = 'ACTIVE',
  PENDING_TO_CLOSE = 'PENDING_TO_CLOSE',
}
export const PHONE_CONTACT_SUPPORT = 'tel:02462823535';
export const ACNT_STAT_ACTIVE = 'ACTIVE';
export const ACNT_STAT_VSD_PENDING = 'VSD_PENDING';
export const USER_STATUS_VERIFIED = 'Verified';
export const USER_STATUS_UNVERIFIED = 'Unverified';
export const USER_STATUS_PENDING = 'Pending';
export const POST_TYPE = {
  POST: 'Post',
  ACTIVITY_THEME: 'ActivityTheme',
  ACTIVITY_WATCHLIST: 'ActivityWatchlist',
  ACTIVITY_WATCH_ORDER: 'ActivityMatchOrder',
};
export const POST_TYPE_GROUP = {
  NEWS: 'News',
};
