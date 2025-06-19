import { OptionType } from "dff-util";

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

import { TestType } from "./types";

export const DefaultTest: TestType = {
  name: "",
  countries: [],
  country: "",
  lang: {
    "en-US": "",
    "te-IN": "",
    "ar-SA": "",
  },
};

export const LoadedTest: TestType = {
  name: "John Doe",
  eventDate: "2000-06-19T12:25:43.197Z",
  countries: ["IN", "US"],
  country: "IN",
  lang: {
    "en-US": "How are you?",
    "te-IN": "మీరు ఎలా ఉన్నారు?",
    "ar-SA": "كيف حالك؟",
  },
};

export const onCountryLoad = async (url: string) => {
  console.log("onCountryLoad", url);

  return Promise.resolve(counties);
};
