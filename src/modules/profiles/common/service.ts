import { signal } from "@preact/signals";
import { ConstKeys } from "dff-util";

import { ShowToast } from "@/utils/services/app.event";
import AppHttp, { MsUrl, ApiUrl } from "@/utils/services/app.http";
import { GridData } from "@/config/grid-data";
import { t } from "@/i18n";

export const profileIsPopupOpen = signal<boolean>(false);
export const profileIsEditMode = signal<boolean>(false);
export const profileSelectedId = signal<string | undefined>();

export const editModeUpdate = (id: string | undefined, mode?: "edit" | "add") => {
  console.log(id, mode);
  if (mode === "add") {
    profileSelectedId.value = undefined;
    profileIsEditMode.value = true;
    profileIsPopupOpen.value = true;
  } else {
    if (id) {
      profileSelectedId.value = id;
      profileIsEditMode.value = mode === "edit" ? true : false;
      profileIsPopupOpen.value = true;
    } else {
      profileSelectedId.value = undefined;
      profileIsEditMode.value = false;
      profileIsPopupOpen.value = false;
    }
  }
};

export const profileListIsLoading = signal<boolean>(false);
export const profileListCall = async (params: any) => {
  try {
    profileListIsLoading.value = true;
    //const url = MsUrl.sor + ApiUrl.load;

    await new Promise((resolve) => setTimeout(resolve, 2000));
    const resp = { data: GridData, total: GridData.length };

    resp;

    return resp;
  } catch (error: any) {
    const message = error?.error?.message || ConstKeys.WENT_WRONG;

    ShowToast(t(message), "warning");
  } finally {
    profileListIsLoading.value = false;
  }
};

export const profileEntityIsLoading = signal<boolean>(false);
export const profileEntityCall = async (params: Record<string, string>) => {
  try {
    profileEntityIsLoading.value = true;
    const url = MsUrl.sor + ApiUrl.load;
    const resp = await AppHttp.Post(url, params);

    return resp;
  } catch (error: any) {
    const message = error?.error?.message || ConstKeys.WENT_WRONG;

    ShowToast(t(message), "warning");
  } finally {
    profileEntityIsLoading.value = false;
  }
};

export const profileSaveIsLoading = signal<boolean>(false);
export const profileSaveCall = async (params: any) => {
  try {
    profileSaveIsLoading.value = true;
    const url = MsUrl.sor + ApiUrl.load;
    const resp = await AppHttp.Post(url, params);

    return resp;
  } catch (error: any) {
    const message = error?.error?.message || ConstKeys.WENT_WRONG;

    ShowToast(t(message), "warning");
  } finally {
    profileSaveIsLoading.value = false;
  }
};

export const profileStatusIsLoading = signal<boolean>(false);
export const profileStatusCall = async (params: Record<string, string>) => {
  try {
    profileStatusIsLoading.value = true;
    const url = MsUrl.sor + ApiUrl.load;
    const resp = await AppHttp.Post(url, params);

    return resp;
  } catch (error: any) {
    const message = error?.error?.message || ConstKeys.WENT_WRONG;

    ShowToast(t(message), "warning");
  } finally {
    profileStatusIsLoading.value = false;
  }
};
