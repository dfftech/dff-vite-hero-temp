import { signal } from "@preact/signals";
import { ConstMessages } from "dff-util";

import { ShowToast } from "@/utils/services/app.event";
import AppHttp from "@/utils/services/app.http";

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
