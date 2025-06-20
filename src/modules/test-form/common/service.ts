/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
import { ConstMessages, OptionType } from "dff-util";
import { signal } from "@preact/signals-react";
import { ShowToast } from "@/utils/services/app.event";
import AppHttp, { ApiUrl, MsUrl } from "@/utils/services/app.http";

import { TestType } from "./types";

const counties: OptionType[] = [
  {
    label: "India",
    key: "IN",
    disabled: false,
    lang: {
      "en-US": "India",
      "te-IN": "భారతదేశం",
      "ar-SA": "عمان",
    },
  },
  {
    label: "USA",
    key: "US",
    disabled: false,
    lang: {
      "en-US": "United state of America",
      "te-IN": "యునైటెడ్ స్టేట్ ఆఫ్ అమెరికా",
      "ar-SA": "الولايات المتحدة الأمريكية",
    },
  },
  {
    label: "UK",
    key: "UK",
    disabled: false,
    lang: {
      "en-US": "United Kingdom",
      "te-IN": "యునైటెడ్ కింగ్‌డమ్",
      "ar-SA": "المملكة المتحدة",
    },
  },
];

export const testDefaultValue = {
  name: null,
} as unknown as TestType;

export const testDataValue: TestType = {
  name: "John Doe",
  termsAccepted: true,
  eventDate: "2000-06-19T12:25:43.197Z",
  countries: ["IN", "US"],
  country: "IN",
  lang: {
    "en-US": "How are you?",
    "te-IN": "మీరు ఎలా ఉన్నారు?",
    "ar-SA": "كيف حالك؟",
  },
};

// export const onCountryLoad = async (url: string) => {
//   console.log("onCountryLoad", url);

//   return Promise.resolve(counties);
// };

export const countryIsLoading = signal<boolean>(false);
export const countryOptions = signal<OptionType[]>([]);
export const countryLoadCall = async (id: string, params?: Record<string, string>) => {
  try {
    console.log(id, params);
    countryIsLoading.value = true;
    countryOptions.value = counties;
  } catch (error: any) {
    const message = error?.error?.message || ConstMessages.WENT_WRONG;
    ShowToast(message, "warning");
  } finally {
    countryIsLoading.value = false;
  }
};
