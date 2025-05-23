export type RolesType = "USER" | "PRACTITIONER" | "ADMIN";

export type CurrencyCodeType = "INR" | "USD" | "JPY";

export type AuthStateType = {
  token: string | null;
  isAuthenticated: boolean;
  userId: string | null;
};

export type LanguageType = {
  _id: string;
  lang: string;
  name: string;
  rtl: boolean;
  active: boolean | string;
  nameLocal: string;
  updatedOn: Date;
  country: CountryType["_id"];
};
export type AllLanguageCodesType = "en-US" | "kn-IN" | "ta-IN" | "hi-IN" | "te-IN";

export type SupportedLanguagesType = Extract<AllLanguageCodesType, "en-US" | "te-IN">;

export type TranslationType = Record<SupportedLanguagesType, string>;

export type CountryType = {
  _id: string;
  name: string;
  nameLocal: string;
  googleNames: string[];
  currencyCode: string;
  currencyHex: string;
  telCode: string;
  flag: string;
  flagUrl: string;
  active: boolean;
};

export type FileType = {
  filename: string;
  mimetype: string;
  url: string;
  _id: string;
};

export interface SearchType {
  query: string | number;
}

export type UnixTimestampType = number & { __brand: "UnixTimestamp" };

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
