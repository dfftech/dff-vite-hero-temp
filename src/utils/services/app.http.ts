import { HttpHeaders, Http } from "dff-util";

import AppStorage, { TOKEN } from "./app.storage";

export default class AppHttp {
  private static instance: AppHttp;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppHttp();
      if (typeof window !== "undefined") {
        Http.API_BASE_URL = (window as any)?.env?.REACT_APP_MODULE_BASE_URL || "https://apidev.module.org";
      }
    }

    return this.instance;
  }
  static async Load(id: string, params?: Record<string, string | number | boolean>) {
    const headers = {
      ...HttpHeaders,
      ["Content-Type"]: "application/json",
      authorization: AppStorage.getData(TOKEN, true),
    };

    return await Http.Get(`${MsUrl.sor}${ApiUrl.load}/${id}`, params, headers);
  }

  static async Get(url: string, params: Record<string, string | number | boolean>) {
    const headers = {
      ...HttpHeaders,
      ["Content-Type"]: "application/json",
      authorization: AppStorage.getData(TOKEN, true),
    };

    return await Http.Get(url, params, headers);
  }

  static async Post(url: string, params: any) {
    const headers = {
      ...HttpHeaders,
      ["Content-Type"]: "application/json",
      authorization: AppStorage.getData(TOKEN, true),
    };

    return await Http.Post(url, params, headers);
  }
}

export const MsUrl = {
  auth: "/module-auth",
  base: "/module-base",
  language: "/module-lang",
  sor: "/module-sor",
};

export const ApiUrl = {
  load: "/load",
};
