import { AllLanguageCodesType } from "dff-util/dist/main/const-type";

export type RolesType = "USER" | "PRACTITIONER" | "ADMIN";

export type CurrencyCodeType = "INR" | "USD" | "JPY";

export type AuthStateType = {
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null;
};

export type LanguageType = {
  lang: string;
  name: string;
  dir: "ltr" | "rtl";
  locale: string;
};

export type SupportedLanguagesType = Extract<AllLanguageCodesType, "en-US" | "te-IN" | "ar-SA">;

export type TranslationType = Record<SupportedLanguagesType, string>;

export interface SiteInfoType {
  _id: string;
  summary: string;
  title: string;
  active?: boolean;
  img?: string;
  video?: string;
  order?: number;
  page: string;
  subTitle?: string;
}
