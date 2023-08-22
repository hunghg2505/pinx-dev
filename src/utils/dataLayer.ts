declare const window: any;

export const Logout = (time: Date) => {
  try {
    window.dataLayer.push({
      event: 'Logout',
      'Login Status': 'Not Login',
      'Last Seen Time': time,
      'Last Seen App': 'PineX Website',
    });
  } catch {}
};

export const NavigateSection = (navigate: string) => {
  try {
    window.dataLayer.push({
      event: 'Navigate Section',
      'Navigate To': navigate,
    });
  } catch {}
};
export const GetMoreInfo = (screenName: string, infoGroup: string, infoDetail: string) => {
  try {
    window.dataLayer.push({
      event: 'Get More Info',
      'Screen Name': screenName,
      'Info Group': infoGroup,
      'Info Detail': infoDetail,
    });
  } catch {}
};
export const RegisterTracking = (startRegistration: Date, CTALocaiton: string, CTAType: string) => {
  try {
    window.dataLayer.push({
      event: 'Register',
      'KYC Status': 'Start Register Account',
      'CTA Type': CTAType,
      'Register CTA Location': CTALocaiton,
      'Start Registration Date': startRegistration,
    });
  } catch {}
};
export const CompleteBasicInfo = (
  SubmitStatus: string,
  errCode: string,
  errMessage: string,
  email: string,
  phone: string,
  Username: string,
) => {
  try {
    window.dataLayer.push({
      event: 'Complete Basic Info',
      'KYC Status': 'Complete Basic Info',
      'Submit Status': SubmitStatus,
      'Error Code': errCode,
      'Error Message': errMessage,
      $email: email,
      $phone: phone,
      Username,
    });
  } catch {}
};
export const CreateLoginName = (
  SubmitStatus: string,
  Username: string,
  errMessage: string,
  errCode: string,
) => {
  try {
    window.dataLayer.push({
      event: 'Create Login Name',
      'KYC Status': 'Complete Basic Info',
      Username,
      'Submit Status': SubmitStatus,
      'Error Message': errMessage,
      'Error Code': errCode,
    });
  } catch {}
};
export const ConfirmPhoneNumber = (
  SubmitStatus: string,
  RegistrationPlatform: string,
  errMessage: string,
  errCode: string,
  phoneVerified: string,
  RegistrationDate: Date,
  email: string,
  name: string,
  phone: string,
  Username: string,
  AcquisitionSource: string,
) => {
  try {
    window.dataLayer.push({
      event: 'Confirm Phone Number',
      'KYC Status': 'Confirm Phone Number',
      'Submit Status': SubmitStatus,
      'Error Message': errMessage,
      'Error Code': errCode,
      'Registration Platform': RegistrationPlatform,
      'Phone Verified': phoneVerified,
      'Start Registration Date': RegistrationDate,
      $email: email,
      $name: name,
      $phone: phone,
      Username,
      'Acquisition Source': AcquisitionSource,
    });
  } catch {}
};
export const ResendSMS = (phone: string) => {
  try {
    window.dataLayer.push({
      event: 'Resend SMS',
      'Phone Number': phone,
    });
  } catch {}
};
export const InvestmentPreference = (company: any, industry: any, topic: any) => {
  try {
    window.dataLayer.push({
      event: 'Investment Preference',
      'Company Of Interest': company,
      'Industry Of Interest': industry,
      'Topic Of Interest': topic,
    });
  } catch {}
};

export const RemoveTicker = (
  Ticker: string,
  Ticker_Type: string,
  Button_Location: string,
  Watchlist_Name: string,
  Number_of_Ticker_in_Watchlist: number | string,
) => {
  try {
    window.dataLayer.push({
      event: 'Remove Ticker',
      Ticker,
      'Ticker Type': Ticker_Type,
      'Button Location': Button_Location,
      'Watchlist Name': Watchlist_Name,
      'Number of Ticker in Watchlist': Number_of_Ticker_in_Watchlist,
    });
  } catch {}
};

export const AddTicker = (
  Ticker: string,
  Ticker_Type: string,
  Button_Location: string,
  Watchlist_Name: string,
  Number_of_Ticker: number | string,
) => {
  try {
    window.dataLayer.push({
      event: 'Add Ticker',
      Ticker,
      'Ticker Type': Ticker_Type,
      'Button Location': Button_Location,
      'Watchlist Name': Watchlist_Name,
      'Number of Ticker': Number_of_Ticker,
    });
  } catch {}
};
export const ModifyWatchlist = (
  Ticker_Added: string[],
  Ticker_Removed: string[],
  Watchlist_Name: string,
  Watchlist_Ticker: string[],
  Number_of_Ticker: string,
) => {
  try {
    window.dataLayer.push({
      event: 'Modify Watchlist',
      'Ticker Added': Ticker_Added,
      'Ticker Removed': Ticker_Removed,
      'Watchlist Name': Watchlist_Name,
      'Watchlist Ticker': Watchlist_Ticker,
      'Number of Ticker': Number_of_Ticker,
    });
  } catch {}
};
export const ViewWatchlist = (
  Watchlist_Name: string,
  Watchlist_Type: string,
  Ticker_List: string[],
  Number_of_Ticker: number,
  Watchlist_View_Location: string,
) => {
  try {
    window.dataLayer.push({
      event: 'View Watchlist',
      'Watchlist Name': Watchlist_Name,
      'Watchlist Type': Watchlist_Type,
      'Ticker List': Ticker_List,
      'Number of Ticker': Number_of_Ticker,
      'Watchlist View Location': Watchlist_View_Location,
    });
  } catch {}
};
export const ViewStockList = (
  Preset_Name: string,
  Preset_Group: string,
  List_Feature: string,
  List_Location: string,
) => {
  try {
    window.dataLayer.push({
      event: 'View Stock List',
      'Preset Name': Preset_Name,
      'Preset Group': Preset_Group,
      'List Feature': List_Feature,
      'List Location': List_Location,
    });
  } catch {}
};
export const ViewTickerInfo = (
  Ticker: string,
  Ticker_Location: string,
  Ticker_Location_Detail: string,
  Ticker_Type: string,
) => {
  try {
    window.dataLayer.push({
      event: 'View Ticker Info',
      Ticker,
      'Ticker Location': Ticker_Location,
      'Ticker Location Detail': Ticker_Location_Detail,
      'Ticker Type': Ticker_Type,
    });
  } catch {}
};
export const AnalyzeTicker = (Ticker: string, Info_Type: string, Info_Group: string) => {
  try {
    window.dataLayer.push({
      event: 'Analyze Ticker',
      Ticker,
      'Info Type': Info_Type,
      'Info Group': Info_Group,
    });
  } catch {}
};
export const ReadNews = (
  News_Type: string,
  News_Source: string,
  News_Category: string,
  Tags: string[],
  News_Location: string,
) => {
  try {
    window.dataLayer.push({
      event: 'Read News',
      'News Type': News_Type,
      'News Source': News_Source,
      'News Category': News_Category,
      Tags,
      'News Location': News_Location,
    });
  } catch {}
};
export const FilterNews = () => {
  try {
    window.dataLayer.push({
      event: 'Filter News',
    });
  } catch {}
};
export const ContactPinetree = (
  Contact_Email: string,
  Contact_Phone: string,
  Contact_Fullname: string,
  Feedback_Type: string[],
  Has_Screenshot: boolean,
) => {
  try {
    window.dataLayer.push({
      event: 'Contact Pinetree',
      'Contact Email': Contact_Email,
      'Contact Phone': Contact_Phone,
      'Contact Fullname': Contact_Fullname,
      'Feedback Type': Feedback_Type,
      'Has Screenshot': Has_Screenshot,
    });
  } catch {}
};
export const Search = (
  Search_Term: string,
  Ticker: string,
  Number_of_Result: number,
  Filter: string[],
  Search_Bar_Location: string,
) => {
  try {
    window.dataLayer.push({
      event: 'Search',
      'Search Term': Search_Term,
      Ticker,
      'Number of Result': Number_of_Result,
      Filter,
      'Search Bar Location': Search_Bar_Location,
    });
  } catch {}
};
export const ViewAsset = (Button_Location: string, Asset_Detail: string) => {
  try {
    window.dataLayer.push({
      event: 'View Asset',
      'Button Location': Button_Location,
      'Asset Detail': Asset_Detail,
    });
  } catch {}
};
export const AnalyzeAsset = (Asset_Info: string) => {
  try {
    window.dataLayer.push({
      event: 'AnalyzeAsset',
      'Asset Info': Asset_Info,
    });
  } catch {}
};
export const GetDepositInfo = () => {
  try {
    window.dataLayer.push({
      event: 'Get Deposit Info',
    });
  } catch {}
};
export const ClickaPost = (
  Post_ID: string,
  Post_Type: string,
  Hastag: string[],
  Ticker: string[],
  Link: any,
  Theme: string,
) => {
  try {
    window.dataLayer.push({
      event: 'Click a Post',
      'Post ID': Post_ID,
      'Post Type': Post_Type,
      'Hastag #': Hastag,
      'Ticker %': Ticker,
      Link,
      Theme,
    });
  } catch {}
};
export const AllowNotification = (App_Notification: string) => {
  try {
    window.dataLayer.push({
      event: 'Allo Notification',
      'App Notification': App_Notification,
    });
  } catch {}
};
export const DownloadPineXApp = (CTA_Type?: string, Register_CTA_Location?: string) => {
  try {
    window.dataLayer.push({
      event: 'Download PineX App',
      'KYC Status': 'Start Activate VSD Account',
      'CTA Type': CTA_Type,
      'Register CTA Location': Register_CTA_Location,
    });
  } catch {}
};
