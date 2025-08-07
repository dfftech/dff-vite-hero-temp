import { Http } from "dff-util";

import AppStorage, { TOKEN } from "./app.storage";

const TENANT_ID = "tenant1";
const API_BASE_URL = "https://apidev.project-temp.org";

export default class AppHttp {
  static MsUrl = {
    base: "/project-temp-base",
    auth: "/project-temp-auth",
    util: "/project-temp-util",
    main: "/project-temp-main",
    sor: "/project-temp-sor",
    events: "/project-temp-events",
  };

  static Headers() {
    return {
      ["Content-Type"]: "application/json",
      "x-tenant-id": TENANT_ID,
      authorization: AppStorage.getData(TOKEN),
    };
  }

  static BaseUrl() {
    if (typeof window !== "undefined") {
      Http.API_BASE_URL =
        (window as any)?.env?.REACT_APP_PROJECT_TEMP_BASE_URL || API_BASE_URL;
    }

    return Http.API_BASE_URL;
  }
  static async Load(
    id: string,
    params: Record<string, string | number | boolean>,
  ) {
    const headers = { ...AppHttp.Headers() };

    return await Http.Get(`${AppHttp.MsUrl.sor}/load/${id}`, params, headers);
  }

  static async Get(
    url: string,
    params: Record<string, string | number | boolean>,
  ) {
    const headers = { ...AppHttp.Headers() };

    return await Http.Get(url, params, headers);
  }

  static async Post(url: string, params: any) {
    const headers = { ...AppHttp.Headers() };

    return await Http.Post(url, params, headers);
  }

  static async Put(url: string, id: string, params: any) {
    const headers = { ...AppHttp.Headers() };

    return await Http.Post(url + "/" + id, params, headers);
  }

  static async Delete(url: string, id: string, params?: Record<string, any>) {
    const headers = { ...AppHttp.Headers() };

    return await Http.Delete(url + "/" + id, params, headers);
  }

  static async CloudUpload(url: string, file: File) {
    return await Http.CloudUpload(url, file);
  }

  static async DownloadFile(url: string, params: any) {
    const blob = await Http.FileDownload(url, params);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = url.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    return true;
  }
}
