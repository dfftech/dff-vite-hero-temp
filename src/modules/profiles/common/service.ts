import { signal } from "@preact/signals";
import { ConstMessages } from "dff-util";

import { ShowToast } from "@/utils/services/app.event";
import AppHttp from "@/utils/services/app.http";

export const isDataLoading = signal<boolean>(false);
export const onData = async (data: any) => {
  try {
    isDataLoading.value = true;
    console.log("onData data :: ", data);
    const url = "https://jsonplaceholder.typicode.com/users";
    const params = { ...data };
    const resp = await AppHttp.Post(url, params);

    console.log("onData resp :: ", resp);

    return resp;
  } catch (error: any) {
    console.error("onData error :: ", error);
    const messsage = error?.error?.message || ConstMessages.WENT_WRONG;

    ShowToast(messsage, "warning");
  } finally {
    isDataLoading.value = false;
  }
};
