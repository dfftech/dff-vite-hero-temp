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

export const LoadCountries = () => {
  Promise.resolve(counties);
};
