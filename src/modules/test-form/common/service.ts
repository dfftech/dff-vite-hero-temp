/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
import { ConstMessages, OptionType } from "dff-util";
import { signal } from "@preact/signals-react";
import { ShowToast } from "@/utils/services/app.event";

import { TestType } from "./types";
import { counties } from "./data";

export const drawerOpen = signal<boolean>(false);

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
  md: {
    "en-US": "### Welcome!\nThis is **English** content.",
    "te-IN": "### స్వాగతం!\nఇది **తెలుగు** సమాచారం.",
    "ar-SA": "### أهلاً وسهلاً!\nهذا محتوى **بالعربية**.",
  },
  otp: "555999",
  time: "16:25:43",
  mdxWithoutLang: "### Welcome!\nThis is **English** content.",
  mdv: "### Welcome!\nThis is **English** content.",
};

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
