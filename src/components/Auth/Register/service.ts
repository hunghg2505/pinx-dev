/* eslint-disable unicorn/numeric-separators-style */
/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH, requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IUserRegisInfo {
  phoneNumber: string;
  email: string;
  password: string;
  recaptcha: string;
}

interface IBodySubmitOtp {
  otp: string;
}

export const useRegister = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ phoneNumber, email, password, recaptcha }: IUserRegisInfo) => {
      return requestPist.post(API_PATH.REGISTER, {
        data: {
          email,
          phone: phoneNumber,
          reCAPTCHA: recaptcha,
          password,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};

const serviceRegisterOtp = async (value: IBodySubmitOtp) => {
  return privateRequest(requestPist.post, API_PATH.REGISTER_OTP, {
    params: value,
  });
};

export const useRegisterOtp = (options: IOptionsRequest) => {
  const requestRegisterOtp = useRequest(serviceRegisterOtp, {
    manual: true,
    ...options,
  });

  return requestRegisterOtp;
};

// export const useRegisterOtp = (options: IOptionsRequest) => {
//   return useRequest(
//     // eslint-disable-next-line require-await
//     async ({ otp }: IBodySubmitOtp) => {
//       return requestPist.post(API_PATH.REGISTER_OTP + `?otp=${123456}`, {
//         data: {
//           otp,
//         },
//         headers: {
//           Authorization:
//             'eyJhbGciOiJIUzI1NiJ9.eyJjaWYiOiIwMDExMjUzMyIsImZpcnN0TG9naW4iOmZhbHNlLCJ2c2QiOiIwMTBDMDcxNzU4Iiwic2Vzc2lvbiI6ImhhZkF2UlhkdHRiOGRSUU5HUHZNMUJHRFZibUpSUjYzYTNUQk5UMW9oZ05rM0Q1Yms1VFJHNnFQRTRGcXVyMmEiLCJhY250U3RhdCI6IkFDVElWRSIsImF1dGhEZWYiOiJUT1AiLCJ1c2VySWQiOjE1NTAsImF1dGhvcml0aWVzIjoiUk9MRV9DVVNUT01FUiIsImV4cGlyZWRBdCI6MTcxODM2NDc5NzI0Nywic3ViQWNjb3VudE5vIjoiTjAwMDc4ODkzIiwiY3VzdFN0YXQiOiJQUk8iLCJwaG9uZSI6IjA5ODYwNTcxNDciLCJhY2NvdW50Tm8iOiIwMDA3ODg3OSIsIm5hbWUiOiJU4buQTkcgVEjhu4ogTUFJIE1BSSBNQUkgTkdBIiwiZW1haWwiOiJza3NrZmxkQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiMDk4NjA1NzE0NyJ9.2Sf45ZlneHv7xGOuU5wRTzm2qmAvTgRr9BITOrUEj2A',
//         },
//       });
//     },
//     {
//       manual: true,
//       ...options,
//     },
//   );
// };
