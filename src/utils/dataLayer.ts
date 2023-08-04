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
export const Register = (startRegistration: Date, CTALocaiton: string, CTAType: string) => {
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
