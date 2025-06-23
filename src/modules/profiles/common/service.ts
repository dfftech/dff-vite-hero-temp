import { signal } from "@preact/signals";
import { ConstMessages } from "dff-util";

import { ShowToast } from "@/utils/services/app.event";
import AppHttp, { MsUrl, ApiUrl } from "@/utils/services/app.http";
import { GridData } from "@/config/grid-data";

export const isDataLoading = signal<boolean>(false);
export const onData = async (data: any) => {
  try {
    isDataLoading.value = true;
    const url = "https://jsonplaceholder.typicode.com/users";
    const params = { ...data };
    const resp = await AppHttp.Get(url, params);

    return resp;
  } catch (error: any) {
    const messsage = error?.error?.message || ConstMessages.WENT_WRONG;

    ShowToast(messsage, "warning");
  } finally {
    isDataLoading.value = false;
  }
};

export const testFetchIsLoading = signal<boolean>(false);
export const testFetchCall = async (params: any) => {
  try {
    testFetchIsLoading.value = true;
    const url = MsUrl.sor + ApiUrl.load;

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("url ::", url, params);

    const resp = { data: GridData, total: GridData.length };

    resp;

    return resp;
  } catch (error: any) {
    const message = error?.error?.message || ConstMessages.WENT_WRONG;

    ShowToast(message, "warning");
  } finally {
    testFetchIsLoading.value = false;
  }
};
