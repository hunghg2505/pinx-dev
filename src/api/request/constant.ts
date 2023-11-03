import { ENV } from '@utils/env';

export const PREFIX_API_PIST = ENV.URL_API_PIST;
export const PREFIX_API_MARKET = ENV.URL_API_MARKET;
export const PREFIX_API_COMMUNITY = ENV.URL_API_COMMUNITY;
export const PREFIX_API_UPLOADPHOTO = ENV.URL_UPLOADPHOTO;
export const PREFIX_API_IP_COMMUNITY = ENV.URL_IP_API_COMMUNITY;
export const PREFIX_API_IP_PIST = ENV.URL_IP_API_PIST;
export const PREFIX_API_IP_MARKET = ENV.URL_IP_API_MARKET;
export const PREFIX_API_IP_NOTIFICATION = ENV.URL_API_NOTIFICATION;
export const REQ_TIMEOUT = 60 * 1000;

export const isDev = ENV.NODE_ENV === 'development';