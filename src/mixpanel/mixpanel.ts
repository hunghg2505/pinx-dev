// load mixpanel-browser from CDN assing to window
// import mixpanel from 'mixpanel-browser';

const getMixpanel = () => {
  try {
    // @ts-nocheck
    return (window as any).mixpanel;
  } catch {}
};

export const openWebTracking = (isLogged: boolean, cif?: string, lastTimeVisit?: string) => {
  getMixpanel()?.track('Open App', {
    'Time of Last Visit': lastTimeVisit,
  });
  getMixpanel()?.register({
    Platform: 'PineX Website',
    'Login Status': isLogged ? 'Login' : 'Not login',
    'Implementation Method': 'Client-Side',
    CIF: cif,
  });
  getMixpanel()?.people.set({
    'Time of Last Visit': lastTimeVisit,
  });
};

export const loginTracking = (
  loginStatus: string,
  cif: string,
  kycStatus: string,
  username: string,
  time: Date,
  loginId: string,
) => {
  getMixpanel()?.register({
    'Login Status': loginStatus,
    CIF: cif,
    'KYC Status': kycStatus,
  });

  getMixpanel()?.track('Login', {
    Username: username,
    'Login ID': loginId,
    'Login Method': 'Password',
  });

  getMixpanel()?.people.set({
    Username: username,
    'Time of Last Visit': time,
    $name: cif,
  });
};

export const logoutTracking = (time: Date) => {
  getMixpanel()?.register({
    'Login Status': 'Not Login',
  });
  getMixpanel()?.track('Logout', {});
  getMixpanel()?.people.set({
    'Last Seen Time': time,
    'Last Seen App': 'PineX Website',
  });
};

export const reset = () => {
  getMixpanel()?.reset();
};

export const navigateSectionTracking = (navigate: string) => {
  getMixpanel()?.track('Navigate Section', {
    'Navigate To': navigate,
  });
};

export const getMoreInfoTracking = (screenName: string, infoGroup: string, infoDetail: string) => {
  getMixpanel()?.track('Get More Info', {
    'Screen Name': screenName,
    'Info Group': infoGroup,
    'Info Detail': infoDetail,
  });
};

export const registerTracking = (
  startRegistration: string,
  CTALocation: string,
  CTAType: string,
) => {
  getMixpanel()?.register({
    'KYC Status': 'Start Register Account',
  });
  getMixpanel()?.track('Register', {
    'CTA Type': CTAType,
    'Register CTA Location': CTALocation,
    'Start Registration Date': startRegistration,
  });
};

export const completeBasicInfoTracking = (
  submitStatus: string,
  errCode: string,
  errMessage: string,
  email: string,
  phone: string,
  userName: string,
) => {
  getMixpanel()?.register({
    'KYC Status': 'Complete Basic Info',
  });
  getMixpanel()?.track('Complete Basic Info', {
    'Submit Status': submitStatus,
    'Error Code': errCode,
    'Error Message': errMessage,
    $email: email,
    $phone: phone,
    Username: userName,
  });
};

export const createLoginNameTracking = (
  submitStatus: string,
  username: string,
  errMessage: string,
  errCode: string,
) => {
  getMixpanel()?.register({
    'KYC Status': 'Complete Basic Info',
  });
  getMixpanel()?.track('Create Login Name', {
    Username: username,
    'Submit Status': submitStatus,
    'Error Message': errMessage,
    'Error Code': errCode,
  });
};

export const confirmPhoneNumberTracking = (
  submitStatus: string,
  errMessage: string,
  errCode: string,
  phoneVerified: string,
  registrationDate: Date,
  email: string,
  name: string,
  phone: string,
  username: string,
) => {
  getMixpanel()?.register({
    'KYC Status': 'Confirm Phone Number',
  });
  getMixpanel()?.track('Confirm Phone Number', {
    'Submit Status': submitStatus,
    'Error Message': errMessage,
    'Error Code': errCode,
  });
  getMixpanel()?.people.set({
    'KYC Status': 'Confirm Phone Number',
    'Registration Platform': 'PineX Website',
    'Phone Verified': phoneVerified,
    'Start Registration Date': registrationDate,
    $email: email,
    $name: name,
    $phone: phone,
    Username: username,
  });
};

export const resendSMSTracking = () => {
  getMixpanel()?.track('Resend SMS');
};

export const investmentPreferenceTracking = (company: any, industry: any, topic: any) => {
  getMixpanel()?.track('Investment Preference', {
    'Company Of Interest': company,
    'Industry Of Interest': industry,
    'Topic Of Interest': topic,
  });
  getMixpanel()?.people.set({
    'Company Of Interest': company,
    'Industry Of Interest': industry,
    'Topic Of Interest': topic,
  });
};

export const removeTickerTracking = (
  ticker: string,
  tickerType: string,
  buttonLocation: string,
  watchListName: string,
  nameOfTickerInWL: number | string,
) => {
  getMixpanel()?.track('Remove Ticker', {
    Ticker: ticker,
    'Ticker Type': tickerType,
    'Button Location': buttonLocation,
    'Watchlist Name': watchListName,
    'Number of Ticker in Watchlist': nameOfTickerInWL,
  });
};

export const addTickerTracking = (
  ticker: string,
  tickerType: string,
  buttonLocation: string,
  watchListName: string,
  numberOfTicker: number | string,
) => {
  getMixpanel()?.track('Add Ticker', {
    Ticker: ticker,
    'Ticker Type': tickerType,
    'Button Location': buttonLocation,
    'Watchlist Name': watchListName,
    'Number of Ticker': numberOfTicker,
  });
};

export const modifyWatchListTracking = (
  tickerAdded: string[],
  tickerRemoved: string[],
  watchListName: string,
  watchListTicker: string[],
  numberOfTicker: number,
) => {
  getMixpanel()?.track('Modify Watchlist', {
    'Ticker Added': tickerAdded,
    'Ticker Removed': tickerRemoved,
    'Watchlist Name': watchListName,
    'Watchlist Ticker': watchListTicker,
    'Number of Ticker': numberOfTicker,
  });
};

export const viewWatchListTracking = (
  watchListName: string,
  watchListType: string,
  tickerList: string[],
  numberOfTicker: number,
  watchListViewLocation: string,
) => {
  getMixpanel()?.track('View Watchlist', {
    'Watchlist Name': watchListName,
    'Watchlist Type': watchListType,
    'Ticker List': tickerList,
    'Number of Ticker': numberOfTicker,
    'Watchlist View Location': watchListViewLocation,
  });
};

export const viewStockListTracking = (
  presetName: string,
  presetGroup: string,
  listFeature: string,
  listLocation: string,
) => {
  getMixpanel()?.track('View Stock List', {
    'Preset Name': presetName,
    'Preset Group': presetGroup,
    'List Feature': listFeature,
    'List Location': listLocation,
  });
};

export const viewTickerInfoTracking = (
  ticker: string,
  tickerLocation: string,
  tickerLocationDetail: string,
  tickerType: string,
) => {
  getMixpanel()?.track('View Ticker Info', {
    Ticker: ticker,
    'Ticker Location': tickerLocation,
    'Ticker Location Detail': tickerLocationDetail,
    'Ticker Type': tickerType,
  });
};

export const analyzeTickerTracking = (ticker: string, infoType: string, infoGroup: string) => {
  getMixpanel()?.track('Analyze Ticker', {
    Ticker: ticker,
    'Info Type': infoType,
    'Info Group': infoGroup,
  });
};

export const readNewsTracking = (
  newsType: string,
  newsSource: string,
  newsCategory: string,
  tags: string[],
  newsLocation: string,
) => {
  getMixpanel()?.track('Read News', {
    'News Type': newsType,
    'News Source': newsSource,
    'News Category': newsCategory,
    Tags: tags,
    'News Location': newsLocation,
  });
};

export const filterNewsTracking = (filterType: string) => {
  getMixpanel()?.track('Filter News', {
    'Filter Type': filterType,
  });
};

export const contactPinetreeTracking = (
  contactEmail: string,
  contactPhone: string,
  contactFullName: string,
  feedbackType: string[],
  hasScreenshot: boolean,
) => {
  getMixpanel()?.track('Contact Pinetree', {
    'Contact Email': contactEmail,
    'Contact Phone': contactPhone,
    'Contact Fullname': contactFullName,
    'Feedback Type': feedbackType,
    'Has Screenshot': hasScreenshot,
  });
};

export const searchTracking = (
  searchTerm: string,
  ticker: string,
  numberOfResult: number,
  searchBarLocation: string,
  filter?: string[],
) => {
  getMixpanel()?.track('Search', {
    'Search Term': searchTerm,
    Ticker: ticker,
    'Number of Result': numberOfResult,
    Filter: filter,
    'Search Bar Location': searchBarLocation,
  });
};

export const viewAssetTracking = (buttonLocation: string, assetDetail: string) => {
  getMixpanel()?.track('View Asset', {
    'Button Location': buttonLocation,
    'Asset Detail': assetDetail,
  });
};

export const analyzeAssetTracking = (assetInfo: string) => {
  getMixpanel()?.track('AnalyzeAsset', {
    'Asset Info': assetInfo,
  });
};

export const getDepositInfoTracking = () => {
  getMixpanel()?.track('Get Deposit Info');
};

export const clickAPostTracking = (
  postId: string,
  postType: string,
  hashtag: string[],
  ticker: string[],
  link: any,
  theme: string,
  location: string,
) => {
  getMixpanel()?.track('Click a Post', {
    'Post ID': postId,
    'Post Type': postType,
    'Hastag #': hashtag,
    'Ticker %': ticker,
    Link: link,
    Theme: theme,
    Location: location,
  });
};

export const allowNotificationTracking = (allowNotification: string) => {
  getMixpanel()?.people.set({
    'PineX Web Notification': allowNotification,
  });
  getMixpanel()?.track('Allow Notification', {
    'App Notification': allowNotification,
  });
};

export const downloadPineXAppTracking = (CTAType?: string, registerCTALocation?: string) => {
  getMixpanel()?.track('Download PineX App', {
    'KYC Status': 'Start Activate VSD Account',
    'CTA Type': CTAType,
    'Register CTA Location': registerCTALocation,
  });
};

export const closeWebTracking = () => {
  getMixpanel()?.track('Close App');
};

// identify user
export const mixpanelIdentifyUser = (cif: string) => {
  getMixpanel()?.identify(cif);
};
